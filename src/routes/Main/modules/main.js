/**
 * Created by Administrator on 2016/10/18.
 */
import Immutable from 'immutable';

export const INITIAL = 'INITIAL';  // 初始化
export const LOAD_CHAT_LIST = 'LOAD_CHAT_LIST';   // 加载聊天室列表
export const LOAD_MESSAGE_LIST = 'LOAD_MESSAGE_LIST';   // 加载消息列表
export const SWITCH_CHAT = 'SWITCH_CHAT';  // 切换聊天室
export const CHANGE_WINDOW = 'CHANGE_WINDOW';   // 修改窗口模式
export const USER_JOIN = 'USER_JOIN';   // 用户加入聊天室
export const USER_LEFT = 'USER_LEFT';   // 用户离开聊天室
export const LOGIN_LOADING = 'LOGIN_LOADING';  // 登录动画
export const LOGIN_IN = 'LOGIN_IN';   // 登录
export const JOIN_SUCCESS = 'JOIN_SUCCESS';  // 加入聊天室成功
export const NEW_MESSAGE = 'NEW_MESSAGE';  // 新消息


export function newMessage(data) {
  return {
    type: NEW_MESSAGE,
    data,
  }
}

export function changeWindow(window = 'normal') {
  return {
    type: CHANGE_WINDOW,
    window,
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
    const { data: { chat } } = action;
    let stateChat = state.get('chat');
    if (chat) {
      stateChat = stateChat.set('userNum', chat.userNum);
    }
    return state.set('chat', stateChat);
  },
  [LOGIN_LOADING]: (state) => {
    return state.set('loginLoading', true);
  },
  [LOGIN_IN]: (state, action) => {
    const { data } = action;
    return state.set('username', data.username).set('loginLoading', false);
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
  currentChat: '', // 当前聊天室
});

export default function mainReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
