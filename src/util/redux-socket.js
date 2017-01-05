/**
 * Created by MingYin Lv on 17/1/5:下午3:44.
 */

import { SocketIdentify } from './getSocket';
import { initial, showLoginLoading, switchChat } from '../routes/Main/modules/main';
// socket 连接成功后触发的action

// socket 对象
let socket = null;

/**
 * 传入socket.io服务器地址生成socket中间件
 * @param socketServer socket.io服务器地址
 * @returns {function({dispatch: *, getState: *})} redux 中间件
 */
export default (socketServer) => {
  // 初始化socket.io
  socket = io(socketServer);
  // 返回中间件
  return ({ dispatch, getState }) => {
    console.log('redux socket');
    socket.on('connected', (data) => {
      // socket连接成功后,initial
      dispatch(initial({
        ...data,
        userId: socket.id,
      }));
      const username = localStorage.getItem('username');
      if (username) {
        dispatch(showLoginLoading());
        socket.emit('login', {
          username,
        });
      }
    });

    socket.on('action', (action) => {
      // 接收action
      dispatch(action);
      if (action.type === 'LOGIN_IN') {
        // 如果是登录成功,执行其他操作
        const chatList = getState().getIn(['main', 'chatList']);
        if (chatList && chatList.size > 0) {
          const chat = chatList.get(0);
          dispatch(switchChat(chat.get('name')));
          socket.emit('user join', {
            chatName: chat.get('name'),
          });
        }
      }
    });

    return next => action => {
      if (action instanceof SocketIdentify) {
        return action.action(dispatch, getState, socket);
      }
      return next(action);
    }
  }
};
