/**
 * Created by MingYin Lv on 2016/10/23.
 */

import React, {Component, PropTypes} from 'react';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import {connect} from 'react-redux';
import Dialog from '../../components/Dialog';
import {switchChat} from '../../routes/Main/modules/main';
import classes from './ChatList.scss';
import ChatItem from '../ChatItem';
import Button from '../../components/Button';

const propTypes = {
  chatList: PropTypes.object.isRequired,
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
    this.setVisible(true);
  };

  hideAddModal = () => {
    this.setVisible(false);
  };


  render() {

    const {chatList, chatId, switchChat} = this.props;

    const chats = chatList.map(n => {
      const active = n.get('id') === chatId;
      return (
        <ChatItem switchChat={switchChat} key={n.get('id')} active={active} data={n}/>
      );
    });
    return (
      <div className={classes.chatList}>
        {chats}
        <div className={classes.addChat}>
          <Button type="success" onClick={this.showAddModal}>新建聊天室</Button>
        </div>
        <Dialog
          title="添加聊天室"
          height={400}
          visible={this.state.visible}
          onClose={this.hideAddModal}
          animation="zoom"
          maskAnimation="fade"
        >
          123
        </Dialog>
      </div>
    );
  }
}

ChatList.propTypes = propTypes;

const mapStateToProps = (state) => ({
  chatList: state.getIn(['main', 'chatList']),
  chatId: state.getIn(['main', 'chatId']),
});

const mapDispatchToProps = {
  switchChat
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
