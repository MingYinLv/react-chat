/**
 * Created by MingYin Lv on 2016/11/16.
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { connect } from 'react-redux';
import classes from './ChatContent.scss';
import ChatInput from '../ChatInput';
import MessageItem from './MessageItem';
import {
  newMessage
} from '../../routes/Main/modules/main';

const propTypes = {
  messageList: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  newMessage: PropTypes.func.isRequired,
  chatName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

class ChatContent extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentWillReceiveProps() {
    this.prevProps = this.props;
  }

  componentDidUpdate() {
    if (this.prevProps.messageList !== this.props.messageList) {
      const context = this.refs.context;
      context.scrollTop = context.scrollHeight;
    }
  }

  render() {
    const { chat, chatName, messageList, username, userId, newMessage } = this.props;

    const messages = messageList.map((n, index) => {
      return <MessageItem key={index} message={n} />;
    });

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.info}>
            当前聊天室 : {chatName} &nbsp; &nbsp; 人数 : {chat.get('userNum')}
          </div>
          <div className={classes.context} ref="context">
            {messages}
          </div>
        </div>
        <ChatInput
          username={username}
          userId={userId}
          newMessage={newMessage}
          chatName={chatName}
        />
      </div>
    )
  }
}

ChatContent.propTypes = propTypes;

const mapStateToProps = state => ({
  messageList: state.getIn(['main', 'messageList']),
  chat: state.getIn(['main', 'chat']),
  chatName: state.getIn(['main', 'chatName']),
  username: state.getIn(['main', 'username']),
  userId: state.getIn(['main', 'userId']),
});

const mapDispatchToProps = {
  newMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
