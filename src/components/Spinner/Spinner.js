/**
 * Created by LiuMY on 2016/9/6.
 */


import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Spinner.scss';

const propTypes = {
  size: PropTypes.string,
};

/**
 * @component loading 动画
 * @param size 动画的大小 默认 'default'
 * @param otherProps 其他属性
 */
const Spinner = ({ size = 'default', ...otherProps }) => {
  const defaultCls = classNames({
    [classes.doubleBounce]: true,
    [classes.sizeLarge]: size === 'large',
    [classes.sizeDefault]: size === 'default',
    [classes.sizeSmall]: size === 'small',
  });

  return (
    <div
      className={defaultCls}
      {...otherProps}
    >
      <div className={classes.doubleBounce1} />
      <div className={classes.doubleBounce2} />
    </div>
  );
};

Spinner.propTypes = propTypes;

export default Spinner;
