/**
 * Created by MingYin Lv on 2016/10/23.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import classNames from 'classnames';
import {initial, changeWindow} from '../../routes/Main/modules/main';
import classes from './Chat.scss';
import ChatList from '../ChatList';
import ChatContent from '../ChatContent';

const propTypes = {
  initial: PropTypes.func.isRequired,
  window: PropTypes.string.isRequired,
};

class Chat extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    // 初始化加载数据
    this.props.initial();
  }

  changeWindow = () => {
    const {window, changeWindow} = this.props;
    changeWindow(window === 'normal' ? 'max' : 'normal');
  };

  render() {

    const {window} = this.props;

    return (
      <div className={classNames(classes.container, {
        [classes.max]: window === 'max'
      })}>
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
  window: state.getIn(['main', 'window'])
});

const mapDispatchToProps = {
  initial,
  changeWindow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
