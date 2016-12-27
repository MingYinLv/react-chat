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
const propTypes = {};

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

  onSubmit = () => {
    this.setState({
      message: '聊天室名称错误',
    });
  };

  onChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.hide();
    }
  };

  onFocus = () => {
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

    const logos = [];
    for (let i = 1; i <= 10; i++) {
      logos.push(
        <LogoItem index={i} select={i === this.state.logo} onClick={this.selectLogo} key={i} />
      );
    }

    return (
      <Modal
        ref="modal"
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
          </div>
          <div className={classes.buttons}>
            <Button type="primary" onClick={this.onSubmit}>确定</Button>
            <Button type="default" onClick={this.hide}>取消</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

AddChatModal.propTypes = propTypes;

export default AddChatModal;