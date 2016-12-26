/**
 * Created by MingYin Lv on 2016/11/3.
 */

import React, {Component, PropTypes} from 'react';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import RcDialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';

const propTypes = {};

let computeMousePosition; // 保存触发位置
let mousePositionEventBind; // 点击事件状态

class Dialog extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    if (mousePositionEventBind) {
      return;
    }

    // 只有点击事件支持从鼠标位置动画展开
    let thisTimeOut;
    document.addEventListener('click', (e) => {
      computeMousePosition = {
        x: e.pageX,
        y: e.pageY,
      };
      // 20ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      clearTimeout(thisTimeOut);
      thisTimeOut = setTimeout(() => {
        computeMousePosition = null;
      }, 20);
    }, true);
    mousePositionEventBind = true;
  }

  render() {
    return (
      <RcDialog
        mousePosition={computeMousePosition}
        {...this.props}
      />
    );
  }
}

Dialog.propTypes = propTypes;

export default Dialog;
