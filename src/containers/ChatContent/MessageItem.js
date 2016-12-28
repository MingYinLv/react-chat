/**
 * Created by MingYin Lv on 16/12/28:上午10:17
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import classes from './ChatContent.scss';

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
    return (
      <div className={classes.item}>
        <span className={classes.name}>{message.get('username')}</span>
        &nbsp;:&nbsp;&nbsp;
        <span className={classes.time}>{message.get('time')}</span>
        <div className={classes.text} dangerouslySetInnerHTML={{ __html: message.get('message') }} />
      </div>
    );
  }
}

MessageItem.propTypes = propTypes;

export default MessageItem;