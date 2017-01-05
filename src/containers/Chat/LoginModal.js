/**
 * Created by MingYin Lv on 16/12/27:下午5:59
 */

import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Modal from 'boron/WaveModal';
import classNames from 'classnames';
import classes from '../ChatList/ChatList.scss';
import Button from '../../components/Button';
const propTypes = {
  showLoginLoading: PropTypes.func.isRequired,
  loginIn: PropTypes.func.isRequired,
};

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      name: '',
      message: '',
    };
  }

  onSubmit = () => {
    const { loginIn, showLoginLoading } = this.props;
    const { name } = this.state;
    if (!name) {
      this.setState({
        message: '请输入您的用户名',
      });
      return;
    }
    showLoginLoading();
    loginIn(this.state.name);
  };

  onChange = (e) => {
    const { value } = e.target;
    let message = '';
    if (!value) {
      message = '请输入您的用户名';
    }
    this.setState({
      name: value,
      message,
    });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.hide();
    }
  };

  show = () => {
    this.refs.modal.show();
  };

  hide = () => {
    this.refs.modal.hide();
    this.setState({
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

    return (
      <Modal
        ref="modal"
        closeOnClick={false}
        contentStyle={{ background: 'rgba(255,255,255,.6)' }}
      >
        <div className={classes.modal}>
          <h3>登录</h3>
          <div className={classes.name}>
            <div className={classes.label}>聊天室名称</div>
            <div className={classNames(classes.inputBox, {
              [classes.error]: !!this.state.message,
            })}>
              <input
                type="text"
                name="name"
                autoComplete="off"
                onKeyPress={this.onKeyPress}
                value={this.state.name}
                onChange={this.onChange}
                placeholder="请输入您的用户名"
              />
              <div className={classes.line} />
            </div>
            <div className={classes.message}>
              {this.state.message}
            </div>
          </div>
          <div className={classes.buttons}>
            <Button type="primary" onClick={this.onSubmit}>确定</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

LoginModal.propTypes = propTypes;

export default LoginModal;
