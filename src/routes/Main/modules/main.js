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

export function initial({ chatMap }) {
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
    return state.set('chatList', Immutable.fromJS(action.chatList));
  },
  [LOAD_CHAT_LIST]: (state, action) => {
    return state.set('chatList', action.data);
  },
  [LOAD_MESSAGE_LIST]: (state, action) => {
    return state.set('messageList', action.data);
  },
  [SWITCH_CHAT]: (state, action) => {
    return state.set('chatName', action.chatName);
  },
  [CHANGE_WINDOW]: (state, action) => {
    return state.set('window', action.window);
  },
  [USER_JOIN]: (state, action) => {
    const { data } = action;
    console.log(`${data.user.username}-${data.user.id}已加入${data.chatName}`);
    return state;
  },
  [USER_LEFT]: (state, action) => {
    const { data } = action;
    console.log(`${data.user.username}-${data.user.id}离开了${data.chatName}`);
    return state;
  },
  [LOGIN_LOADING]: (state) => {
    return state.set('loginLoading', true);
  },
  [LOGIN_IN]: (state, action) => {
    const { data } = action;
    return state.set('username', data.username).set('loginLoading', false);
  },
};

const initialState = Immutable.fromJS({
  chatList: [{
    id: '1',
    name: '聊天室1',
    icon: '/images/chat/1.png',
    noReadNum: 1,
  }, {
    id: '2',
    name: '聊天室2',
    icon: '/images/chat/2.png',
    noReadNum: 1,
  }, {
    id: '3',
    name: '聊天室3',
    icon: '/images/chat/3.png',
    noReadNum: 3,
  }],   // 聊天室列表
  chatName: '',  // 当前聊天室名称
  messageList: [],  // 消息列表
  window: 'normal',
  username: localStorage.getItem('username'),
  loginLoading: false,
});

export default function mainReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
