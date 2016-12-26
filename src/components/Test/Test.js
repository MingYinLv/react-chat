/**
 * Created by MingYin Lv on 2016/11/27.
 */

import React, {Component, PropTypes} from 'react';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';

const propTypes = {};

class Test extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  static defaultProps = {
    type: 'validateForm'
  };

  render() {
    console.log('test render');
    return (
      <span>123</span>
    )
  }
}

Test.propTypes = propTypes;

export default Test;
