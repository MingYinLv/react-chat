/**
 * Created by MingYin Lv on 2016/12/26.
 */

import React, {Component, PropTypes} from 'react';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import classes from './ChatInput.scss';

const propTypes = {};

class ChatInput extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {

    return (
      <div className={classes.container}>
        123
      </div>
    )
  }
}

ChatInput.propTypes = propTypes;

export default ChatInput;
