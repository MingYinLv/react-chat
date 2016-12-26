/**
 * Created by Administrator on 2016/10/18.
 */

import React, { Component, PropTypes } from 'react';
import classes from './MainContainer.scss';
import Chat from '../../../containers/Chat';

const propTypes = {

};

class MainContainer extends Component{
  render(){
    return (
      <div className={classes.mainWrap}>
        <img src="/images/3.jpg" className={classes.blur} />
        <div className={classes.mask}></div>
        <Chat />
      </div>
    )
  }
}


MainContainer.propTypes = propTypes;

export default MainContainer;
