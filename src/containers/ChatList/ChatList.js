/**
 * Created by MingYin Lv on 2016/10/23.
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { connect } from 'react-redux';
import { switchChat } from '../../routes/Main/modules/main';
import classes from './ChatList.scss';
import ChatItem from '../ChatItem';
import Button from '../../components/Button';
import AddChatModal from './AddChatModal';

const propTypes = {
  chatList: PropTypes.object.isRequired,
  chatName: PropTypes.string.isRequired,
};

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      visible: false,
    };
  }

  setVisible = (visible) => {
    this.setState({
      ...this.state,
      visible,
    });
  };

  showAddModal = () => {
    this.refs.modal.show();
  };

  hideAddModal = () => {
    this.refs.modal.hide();
  };


  render() {

    const { chatList, chatName, switchChat } = this.props;

    const chats = chatList.map(n => {
      const active = n.get('name') === chatName;
      return (
        <ChatItem switchChat={switchChat} key={n.get('name')} active={active} data={n} />
      );
    });
    return (
      <div className={classes.chatList}>
        {chats}
        <div className={classes.addChat}>
          <Button type="success" onClick={this.showAddModal}>新建聊天室</Button>
        </div>
        <AddChatModal ref="modal" />
      </div>
    );
  }
}

ChatList.propTypes = propTypes;

const mapStateToProps = (state) => ({
  chatList: state.getIn(['main', 'chatList']),
  chatName: state.getIn(['main', 'chatName']),
});

const mapDispatchToProps = {
  switchChat
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
