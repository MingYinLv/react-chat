/**
 * Created by Administrator on 2016/10/18.
 */
import Immutable from 'immutable';

export const INITIAL = 'INITIAL';  // 初始化
export const LOAD_CHAT_LIST = 'LOAD_CHAT_LIST';   // 加载聊天室列表
export const LOAD_MESSAGE_LIST = 'LOAD_MESSAGE_LIST';   // 加载消息列表
export const SWITCH_CHAT = 'SWITCH_CHAT';  // 切换聊天室
export const CHANGE_WINDOW = 'CHANGE_WINDOW';   // 修改窗口模式

export function changeWindow(window = 'normal') {
  return {
    type: CHANGE_WINDOW,
    window,
  }
}

export function initial() {
  return (dispatch) => {

  };
}

export function loadChatList(data) {
  return {
    type: LOAD_CHAT_LIST,
    data
  };
}

export function loadMessageList() {
  return {
    type: LOAD_MESSAGE_LIST,
    data
  };
}

export function switchChat(chatId) {
  return {
    type: SWITCH_CHAT,
    chatId,
  }
}

const ACTION_HANDLERS = {
  [INITIAL]: (state) => {
    return state;
  },
  [LOAD_CHAT_LIST]: (state, action) => {
    return state.set('chatList', action.data);
  },
  [LOAD_MESSAGE_LIST]: (state, action) => {
    return state.set('messageList', action.data);
  },
  [SWITCH_CHAT]: (state, action) => {
    return state.set('chatId', action.chatId);
  },
  [CHANGE_WINDOW]: (state, action) => {
    return state.set('window', action.window);
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
  chatId: '1',  // 当前聊天室ID
  messageList: [],  // 消息列表
  window: 'normal',
});

export default function mainReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
