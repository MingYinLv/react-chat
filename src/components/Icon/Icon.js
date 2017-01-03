/**
 * Created by MingYin Lv on 16/12/19:下午5:07.
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Icon.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  stopPropagation: PropTypes.bool,
};

/**
 * @component svg 图标
 * @prop id 图标的 id 值
 * @prop className 引用类 class
 * @prop onClick 点击回调
 * @prop props
 * @prop stopPropagation 阻止冒泡
 */
const Icon = ({ id, className, onClick, stopPropagation = false, ...props }) => {
  // 基于 static 目录路径
  const path = `/symbol-defs.svg#icon_${id}`;

  const defaultCls = classNames({
    [classes.icon]: true,
    [className]: !!className,
  });

  const thatOnClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <svg
      onClick={thatOnClick}
      {...props}
      className={defaultCls}
    >
      <use xlinkHref={path} />
    </svg>
  );
};

Icon.propTypes = propTypes;

export default Icon;
