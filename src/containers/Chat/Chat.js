/**
 * Created by MingYin Lv on 2016/10/23.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import classNames from 'classnames';
import Spinner from '../../components/Spinner';
import { changeWindow, showLoginLoading } from '../../routes/Main/modules/main';
import classes from './Chat.scss';
import ChatList from '../ChatList';
import ChatContent from '../ChatContent';
import LoginModal from './LoginModal';

const propTypes = {
  showLoginLoading: PropTypes.func.isRequired,
  window: PropTypes.string.isRequired,
};

class Chat extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username) {
      this.refs.modal.hide();
    } else {
      this.refs.modal.show();
    }
  }

  componentDidMount() {
    const {username} = this.props;
    if (!username) {
      this.refs.modal.show();
    }
  }

  changeWindow = () => {
    const {window, changeWindow} = this.props;
    changeWindow(window === 'normal' ? 'max' : 'normal');
  };

  render() {

    const {window, loginLoading, showLoginLoading} = this.props;

    const spinner = loginLoading ? (
      <div className={classes.loading}>
        <Spinner />
      </div>
    ) : null;

    return (
      <div className={classNames(classes.container, {
        [classes.max]: window === 'max'
      })}>
        {spinner}
        <LoginModal ref="modal" showLoginLoading={showLoginLoading} />
        <div className={classes.header}>
          <button onClick={this.changeWindow}>最大化</button>
        </div>
        <div className={classes.content}>
          <ChatList />
          <ChatContent />
        </div>
      </div>
    );
  }
}

Chat.propTypes = propTypes;

const mapStateToProps = state => ({
  window: state.getIn(['main', 'window']),
  username: state.getIn(['main', 'username']),
  loginLoading: state.getIn(['main', 'loginLoading'])
});

const mapDispatchToProps = {
  changeWindow,
  showLoginLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
