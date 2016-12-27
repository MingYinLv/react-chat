/**
 * Created by MingYin Lv on 16/12/27:下午1:56.
 */

import {
  USER_JOIN,
  USER_LEFT,
  LOGIN_IN,
  initial,
  showLoginLoading,
  loadMessageList,
} from '../routes/Main/modules/main';

const socket = io('http://localhost:3030');

export const obj = {
  socket
};

export default store => {
  obj.store = store;
}

socket.on('connected', function (data) {
  obj.store.dispatch(initial(data));
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
  console.log('加入聊天室成功', data);
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
