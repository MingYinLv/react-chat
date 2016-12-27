/**
 * Created by MingYin Lv on 16/12/27:下午1:56.
 */

import { USER_JOIN, USER_LEFT, initial } from '../routes/Main/modules/main';

const socket = io('http://192.168.1.86:3030');

export const obj = {
  socket
};

export default store => {
  obj.store = store;
}

socket.on('connected', function (data) {
  obj.store.dispatch(initial(data));
});
socket.on('login success', function (data) {
  console.log('登录成功', data);
});

socket.on('join success', function (data) {
  console.log('加入聊天室成功');
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
