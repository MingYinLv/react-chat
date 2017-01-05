/**
 * Created by MingYin Lv on 16/12/27:上午11:59
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Modal from 'boron/WaveModal';
import classNames from 'classnames';
import classes from './ChatList.scss';
import Button from '../../components/Button';
import LogoItem from './LogoItem';
const propTypes = {
  showAddChatLoading: PropTypes.func.isRequired,
  setCreateFailedMessage: PropTypes.func.isRequired,
  createFailedMessage: PropTypes.string.isRequired,
  showAddChatModal: PropTypes.func.isRequired,
  hideAddChatModal: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  addChatModal: PropTypes.bool.isRequired,
};

class AddChatModal extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      logo: 1,
      name: '',
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addChatModal) {
      this.show();
    } else {
      this.hide();
    }
  }

  onSubmit = () => {
    const { name, logo } = this.state;
    const { showAddChatLoading, createFailedMessage, createChat } = this.props;
    if (!name) {
      this.setState({
        message: '请输入聊天室名称',
      });
      return;
    }

    if (createFailedMessage) return;
    showAddChatLoading();
    createChat({
      chatName: name,
      icon: `/images/chat/${logo}.png`,
    });
  };

  onChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  onFocus = () => {
    this.props.setCreateFailedMessage('');
    this.setState({
      message: '',
    });
  };

  show = () => {
    this.refs.modal.show();
  };

  hide = () => {
    this.refs.modal.hide();
    this.setState({
      logo: 1,
      name: '',
      message: '',
    });
  };

  selectLogo = (index) => {
    this.setState({
      logo: index,
    });
  };

  render() {

    const { createFailedMessage, hideAddChatModal } = this.props;

    const logos = [];
    for (let i = 1; i <= 10; i++) {
      logos.push(
        <LogoItem index={i} select={i === this.state.logo} onClick={this.selectLogo} key={i} />
      );
    }

    return (
      <Modal
        ref="modal"
        closeOnClick={false}
        contentStyle={{ background: 'rgba(255,255,255,.6)' }}
      >
        <div className={classes.modal}>
          <h3>新建聊天室</h3>
          <div className={classes.logo}>
            <div className={classes.label}>选择头像</div>
            {logos}
          </div>
          <div className={classes.name}>
            <div className={classes.label}>聊天室名称</div>
            <div className={classNames(classes.inputBox, {
              [classes.error]: !!this.state.message,
            })}>
              <input
                type="text"
                name="name"
                autoComplete="off"
                onFocus={this.onFocus}
                onKeyPress={this.onKeyPress}
                value={this.state.name}
                onChange={this.onChange}
                placeholder="请输入聊天室名称"
              />
              <div className={classes.line} />
            </div>
            <div className={classes.message}>
              {this.state.message || createFailedMessage}
            </div>
          </div>
          <div className={classes.buttons}>
            <Button type="primary" onClick={this.onSubmit}>确定</Button>
            <Button type="default" onClick={hideAddChatModal}>取消</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

AddChatModal.propTypes = propTypes;

export default AddChatModal;