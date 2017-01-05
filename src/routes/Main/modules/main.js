/**
 * Created by Administrator on 2016/10/18.
 */
import Immutable from 'immutable';
import getSocket from '../../../util/getSocket';
import { Message } from '../../../util/Enum';

export const INITIAL = 'INITIAL';  // 初始化
export const LOAD_CHAT_LIST = 'LOAD_CHAT_LIST';   // 加载聊天室列表
export const LOAD_MESSAGE_LIST = 'LOAD_MESSAGE_LIST';   // 加载消息列表
export const SWITCH_CHAT = 'SWITCH_CHAT';  // 切换聊天室
export const CHANGE_WINDOW = 'CHANGE_WINDOW';   // 修改窗口模式
export const USER_JOIN = 'USER_JOIN';   // 其他用户加入聊天室
export const USER_LEFT = 'USER_LEFT';   // 其他用户离开聊天室
export const LOGIN_LOADING = 'LOGIN_LOADING';  // 登录动画
export const LOGIN_IN = 'LOGIN_IN';   // 登录
export const JOIN_SUCCESS = 'JOIN_SUCCESS';  // 加入聊天室成功
export const NEW_MESSAGE = 'NEW_MESSAGE';  // 新消息
export const CREATE_CHAT_LOADING = 'CREATE_CHAT_LOADING';  // 添加聊天室动画
export const CREATE_CHAT_SUCCESS = 'CREATE_CHAT_SUCCESS';   // 添加聊天室成功
export const CREATE_CHAT_FAILED = 'CREATE_FAILED';   // 添加聊天室
export const SET_CREATE_FAILED_MESSAGE = 'SET_CREATE_FAILED_MESSAGE';
export const SHOW_ADD_CHAT_MODAL = 'SHOW_ADD_CHAT_MODAL';
export const HIDE_ADD_CHAT_MODAL = 'HIDE_ADD_CHAT_MODAL';


export function createChat(data) {
  return getSocket((dispatch, getState, socket) => {
    socket.emit('create chat', data);
  });
}

export function userJoin(chatName) {
  return getSocket((dispatch, getState, socket) => {
    socket.emit('user join', {
      chatName,
    });
  });
}

export function showAddChatModal() {
  return {
    type: SHOW_ADD_CHAT_MODAL,
  }
}

export function hideAddChatModal() {
  return {
    type: HIDE_ADD_CHAT_MODAL,
  }
}

export function setCreateFailedMessage(message) {
  return {
    type: SET_CREATE_FAILED_MESSAGE,
    message,
  }
}

export function newMessage(data) {
  return getSocket((dispatch, getState, socket) => {
    dispatch({
      type: NEW_MESSAGE,
      data,
    });
    socket.emit('new message', {
      message: data.message,
      chatName: data.chatName,
    });
  });
}

export function changeWindow(window = 'normal') {
  return {
    type: CHANGE_WINDOW,
    window,
  }
}


export function showAddChatLoading() {
  return {
    type: CREATE_CHAT_LOADING,
  }
}

export function showLoginLoading() {
  return {
    type: LOGIN_LOADING,
  }
}

export function initial({ chatMap, userId, }) {
  const chatList = Object.keys(chatMap).map((n) => {
    const chat = chatMap[n];
    return {
      name: n,
      ...chat,
    };
  });
  return {
    type: INITIAL,
    chatList,
    userId,
  }
}

export function loginIn(username) {
  return getSocket((dispatch, getState, socket) => {
    socket.emit('login', {
      username,
    });
    const chatList = getState().getIn(['main', 'chatList']);
    if (chatList && chatList.size > 0) {
      const chat = chatList.get(0);
      dispatch(switchChat(chat.get('name')));
      socket.emit('user join', {
        chatName: chat.get('name'),
      });
    }
  });
}

export function loadChatList(data) {
  return {
    type: LOAD_CHAT_LIST,
    data
  };
}

export function loadMessageList(data) {
  return {
    type: LOAD_MESSAGE_LIST,
    data
  };
}

export function switchChat(chatName) {
  return {
    type: SWITCH_CHAT,
    chatName,
  }
}

const ACTION_HANDLERS = {
  [INITIAL]: (state, action) => {
    return state.set('chatList', Immutable.fromJS(action.chatList)).set('userId', action.userId);
  },
  [LOAD_CHAT_LIST]: (state, action) => {
    return state.set('chatList', action.data);
  },
  [LOAD_MESSAGE_LIST]: (state, action) => {
    return state.set('messageList', Immutable.fromJS(action.data));
  },
  [SWITCH_CHAT]: (state, action) => {
    let chat = state.get('chatList').find(n => n.get('name') === action.chatName);
    chat = chat.set('userNum', chat.get('userNum') + 1);
    return state.set('chatName', action.chatName).set('chat', chat);
  },
  [CHANGE_WINDOW]: (state, action) => {
    return state.set('window', action.window);
  },
  [USER_JOIN]: (state, action) => {
    const { data: { chat } } = action;
    let stateChat = state.get('chat');
    if (chat) {
      stateChat = stateChat.set('userNum', chat.userNum);
    }
    return state.set('chat', stateChat);
  },
  [USER_LEFT]: (state, action) => {
    const { data: { chat, user } } = action;
    let stateChat = state.get('chat');
    if (chat) {
      stateChat = stateChat.set('userNum', chat.userNum);
    }
    let messageList = state.get('messageList');
    if (user && chat) {
      messageList = messageList.push(Immutable.fromJS({
        username: user.username,
        userId: user.userId,
        chatName: chat.chatName,
        type: Message.USER_LEFT,
        time: Date.now(),
      }));
    }
    return state.set('chat', stateChat).set('messageList', messageList);
  },
  [LOGIN_LOADING]: (state) => {
    return state.set('loginLoading', true);
  },
  [LOGIN_IN]: (state, action) => {
    const { user } = action;
    localStorage.setItem('username', user.username);
    return state.set('username', user.username).set('loginLoading', false);
  },
  [JOIN_SUCCESS]: (state, action) => {
    const { chat, messages, chatName, } = action.data;
    if (chatName === state.get('chatName')) {
      let stateChat = state.get('chat');
      stateChat = stateChat.set('userNum', chat.userNum);
      return state.set('chat', stateChat)
        .set('messageList', Immutable.fromJS(messages))
        .set('currentChat', chatName);
    }
    return state;
  },
  [NEW_MESSAGE]: (state, action) => {
    let thatState = state;
    const { data }= action;
    if (data && data.chatName === state.get('chatName')) {
      thatState = state.set('messageList', state.get('messageList').push(Immutable.fromJS(data)));
    }
    return thatState;
  },
  [CREATE_CHAT_LOADING]: (state)=> {
    return state.set('addChatLoading', true);
  },
  [CREATE_CHAT_SUCCESS]: (state, action) => {
    const { data } = action;
    return state.set('chatList', state.get('chatList').push(Immutable.fromJS(data)))
      .set('addChatLoading', false)
      .set('createFailedMessage', '')
      .set('addChatModal', false);
  },
  [CREATE_CHAT_FAILED]: (state, action) => {
    return state.set('createFailedMessage', action.message)
      .set('addChatLoading', false);
  },
  [SET_CREATE_FAILED_MESSAGE]: (state, action) => {
    return state.set('createFailedMessage', action.message || '');
  },
  [SHOW_ADD_CHAT_MODAL]: (state) => {
    return state.set('addChatModal', true);
  },
  [HIDE_ADD_CHAT_MODAL]: (state) => {
    return state.set('addChatModal', false);
  },
};

const initialState = Immutable.fromJS({
  chatList: [],   // 聊天室列表
  chatName: '',  // 当前聊天室名称
  chat: {},  // 当前聊天室对象
  messageList: [],  // 消息列表
  window: 'normal',
  username: localStorage.getItem('username') || '',
  userId: '',
  loginLoading: false,
  addChatLoading: false,
  addChatModal: false,
  currentChat: '', // 当前聊天室
  createFailedMessage: '',
});

export default function mainReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
