/**
 * Created by MingYin Lv on 16/12/27:下午1:01
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import classes from './ChatList.scss';
import config from '../../config';

const propTypes = {
  select: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

class LogoItem extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onClick = () => {
    const { index, onClick } = this.props;
    onClick(index);
  };

  render() {
    const { select, index } = this.props;

    return (
      <span
        className={classNames(classes.logoItem, {
          [classes.select]: select,
        })}
        onClick={this.onClick}
      >
          <img src={`${config.publicPath}/images/chat/${index}.png`} />
      </span>
    );
  }
}

LogoItem.propTypes = propTypes;

export default LogoItem;