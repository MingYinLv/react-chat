/**
 * Created by MingYin Lv on 17/1/5:下午3:44.
 */

import { SocketIdentify } from './getSocket';

let socket = null;

export default (socketServer) => {
  socket = io(socketServer);
  return ({ dispatch, getState }) => next => action => {
    if (action instanceof SocketIdentify) {
      return action.action(dispatch, getState, socket);
    }
    return next(action);
  }
};
