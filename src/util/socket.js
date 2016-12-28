/**
 * Created by MingYin Lv on 16/12/27:下午1:56.
 */

import {
  USER_JOIN,
  USER_LEFT,
  LOGIN_IN,
  JOIN_SUCCESS,
  NEW_MESSAGE,
  initial,
  showLoginLoading,
  loadMessageList,
} from '../routes/Main/modules/main';

const socket = io('http://192.168.1.86:3030');

export const obj = {
  socket
};

export default store => {
  obj.store = store;
}

socket.on('connected', function (data) {
  obj.store.dispatch(initial({
    ...data,
    userId: socket.id,
  }));
  const username = localStorage.getItem('username');
  if (username) {
    obj.store.dispatch(showLoginLoading());
    socket.emit('login', {
      username,
    });
  }
});
socket.on('login success', function (data) {
  localStorage.setItem('username', data.username);
  obj.store.dispatch({
    type: LOGIN_IN,
    data,
  });
});

socket.on('join success', function (data) {
  obj.store.dispatch({
    type: JOIN_SUCCESS,
    data,
  });
});

socket.on('user join', function (data) {
  obj.store.dispatch({
    type: USER_JOIN,
    data,
  });
});

socket.on('user left', function (data) {
  obj.store.dispatch({
    type: USER_LEFT,
    data,
  });
});

socket.on('messageList', function (data) {
  obj.store.dispatch(loadMessageList(data));
  console.log(data);
});

socket.on('new message', function (data) {
  obj.store.dispatch({
    type: NEW_MESSAGE,
    data,
  });
});
