/**
 * Created by MingYin Lv on 17/1/3:下午3:35
 */

import React, { Component, PropTypes } from 'react';

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import classes from './ChatHeader.scss';
import chatCls from '../ChatList/ChatList.scss';
import Icon from '../../components/Icon';

const propTypes = {
  window: PropTypes.string.isRequired,
  changeWindow: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onChange = (e) => {
    const { value } = e.target;
    const { onChange } = this.props;
    onChange(value);
  };

  changeWindow = () => {
    const { window, changeWindow } = this.props;
    changeWindow(window === 'normal' ? 'max' : 'normal');
  };

  render() {

    const { window } = this.props;

    return (
      <div className={classes.header}>
        <div className={classes.filterBox}>
          <div className={chatCls.inputBox}>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={this.props.value}
              onChange={this.onChange}
              placeholder="筛选聊天室"
            />
            <div className={chatCls.line} />
          </div>
        </div>
        <div className={classes.toolBtn}>
          <Icon
            onClick={this.changeWindow}
            id={window === 'max' ? 'shrink' : 'enlarge'}
            className={classes.windowIcon}
          />
        </div>
      </div>
    );
  }
}

ChatHeader.propTypes = propTypes;

export default ChatHeader;