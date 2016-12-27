/**
 * Created by MingYin Lv on 2016/10/23.
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import className from 'classnames';
import classes from './ChatItem.scss';
import { obj } from '../../util/socket';

const propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  switchChat: PropTypes.func.isRequired,
};

/**
 * @component ChatItem 聊天室
 * @prop data 聊天室数据
 * * @prop string icon 聊天室图标
 * * @prop string name 聊天室名称
 * * @prop number userNum 用户数量
 * @prop boolean active 当前聊天室是否选中
 * @prop function switchChat 切换聊天室
 */
class ChatItem extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  switchChat = () => {
    const { switchChat, data } = this.props;
    switchChat(data.get('name'));
    const { socket } = obj;
    if (socket) {
      socket.emit('user join', {
        chatName: data.get('name'),
      });
    }
  };

  render() {
    const { data, active } = this.props;

    const chatCls = className(classes.chatItem, {
      [classes.active]: active,
    });

    return (
      <div className={chatCls} onClick={this.switchChat}>
        <img src={data.get('icon')} alt={data.get('name')} className={classes.photo}/>
        {data.get('name')}
        {/*<div className={classes.badge}>{data.get('userNum')}</div>*/}
      </div>
    )
  }
}

ChatItem.propTypes = propTypes;

export default ChatItem;
