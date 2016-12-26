import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Button.scss';

const propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

/**
 * @component 按钮
 * @prop children 按钮文字
 * @prop type 按钮类型,默认 default
 * @prop onClick 事件
 * @prop size 按钮大小 small, default, large
 * @prop children 按钮显示的文字
 * @prop disabled 禁用按钮
 * @otherProps 其他属性
 */
const Button = ({ type = 'default', className, size, children, onClick, disabled, ...otherProps }) => {
  const defaultCls = classNames({
    [classes.btn]: true,
    [classes.btnPrimary]: type === 'primary',
    [classes.btnDefault]: type === 'default',
    [classes.btnInfo]: type === 'info',
    [classes.btnSuccess]: type === 'success',
    [classes.btnWarning]: type === 'warning',
    [classes.btnDanger]: type === 'danger',
    [classes.btnLine]: type === 'line',
    [classes.btnLg]: size === 'large',
    [classes.btnSm]: size === 'small',
    [classes.disabled]: !!disabled,
    [className]: !!className,
  });

  const onThatClick = (e) => {
    if (!disabled) {
      onClick && onClick(e);
    }
  };

  return (
    <button
      {...otherProps}
      type="button"
      className={defaultCls}
      onClick={onThatClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
