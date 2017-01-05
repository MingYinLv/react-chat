/**
 * Created by MingYin Lv on 16/12/28:上午10:17
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import classNames from 'classnames';
import classes from './ChatContent.scss';
import { Message } from '../../util/Enum';

const propTypes = {
  message: PropTypes.object.isRequired,
};

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    const { message } = this.props;
    const time = new Date(parseInt(message.get('time')));
    const timeStr = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() + 1}
                       ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    let overlay = null;
    if (message.get('type') === Message.NORMAL) {
      overlay = (
        <div className={classes.item}>
          <span className={classes.name}>{message.get('username')}</span>
          &nbsp;:&nbsp;&nbsp;
          <span className={classes.time}>{timeStr}</span>
          <div className={classes.text} dangerouslySetInnerHTML={{ __html: message.get('message') }}/>
        </div>
      );
    } else if (message.get('type') === Message.USER_LEFT) {
      overlay = (
        <div className={classNames(classes.item, classes.userLeft)}>
          <span className={classes.text}>
            {timeStr}&nbsp;&nbsp;{message.get('username')}离开了聊天室
          </span>
        </div>
      );
    }

    return overlay;
  }
}

MessageItem.propTypes = propTypes;

export default MessageItem;
