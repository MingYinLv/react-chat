/**
 * Created by MingYin Lv on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import classes from './ChatInput.scss';
import Button from '../../components/Button';

const propTypes = {};

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
    if (e.ctrlKey && e.key === 'Enter') {
      this.onSend();
    }
  };

  onSend = () => {

  };

  onClear = () => {
    this.setState({
      message: '',
    });
  };

  render() {
    const { message } = this.state;
    const msg = message.replace(/(\r)*\n/g, "<br/>").replace(/\s/g, "&nbsp;");
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
