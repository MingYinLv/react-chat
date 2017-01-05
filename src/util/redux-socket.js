/**
 * Created by MingYin Lv on 17/1/5:下午3:44.
 */

import { SocketIdentify } from './getSocket';

// socket 连接成功后触发的action
export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';

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
      // socket连接成功后,执行触发SOCKET_CONNECTED
      dispatch({
        type: SOCKET_CONNECTED,
        data,
      });
    });

    socket.on('action', (action) => {
      // 接收action
      dispatch(action);
    });

    return next => action => {
      if (action instanceof SocketIdentify) {
        return action.action(dispatch, getState, socket);
      }
      return next(action);
    }
  }
};
