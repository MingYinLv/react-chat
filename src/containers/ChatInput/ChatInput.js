/**
 * Created by MingYin Lv on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import classes from './ChatInput.scss';
import Button from '../../components/Button';
import { obj } from '../../util/socket';

const propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  chatName: PropTypes.string.isRequired,
  newMessage: PropTypes.func.isRequired,
};

class ChatInput extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      message: '',
    };
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      message: value,
    });
  };

  onKeyDown = (e) => {
    if ((e.ctrlKey || e.altKey) && e.key === 'Enter') {
      this.onSend();
    }
  };

  onSend = () => {
    const { message } = this.state;
    const { chatName, username, userId, newMessage } = this.props;
    if (message && chatName && obj.socket) {
      // 有消息内容,并且选中了聊天室,并且socket已链接
      const msg = message.replace(/(\r)*\n/g, "<br/>").replace(/\s/g, "&nbsp;");
      this.setState({
        message: '',
      });
      const msgObj = {
        username: username,
        userId: userId,
        message,
        chatName,
        type: 'message',
        time: Date.now(),
      };
      newMessage(msgObj);
      obj.socket.emit('new message', {
        message: msg,
        chatName,
      });
    }
  };

  onClear = () => {
    this.setState({
      message: '',
    });
  };

  render() {
    return (
      <div className={classes.container}>
        <textarea
          className={classes.input}
          placeholder="在这输入聊天内容"
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          value={this.state.message}
        />
        <div className={classes.buttons}>
          <Button type="primary" onClick={this.onSend}>发送</Button>
          <Button type="default" onClick={this.onClear}>清空</Button>
        </div>
      </div>
    )
  }
}

ChatInput.propTypes = propTypes;

export default ChatInput;
