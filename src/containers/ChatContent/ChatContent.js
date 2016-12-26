/**
 * Created by MingYin Lv on 2016/11/16.
 */

import React, {Component, PropTypes} from 'react';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import classes from './ChatContent.scss';
import ChatInput from '../ChatInput';

const propTypes = {
};

class ChatContent extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className={classes.container}>
        <ChatInput />
      </div>
    )
  }
}

ChatContent.propTypes = propTypes;

export default ChatContent;
