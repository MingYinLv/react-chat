import React, {Component, PropTypes} from 'react';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import classes from './CoreLayout.scss';
import '../../styles/index.scss';
const propTypes = {
  children: PropTypes.node.isRequired,
};

class CoreLayout extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    const {children} = this.props;
    return (
      <div className={classes.app}>
        {children}
      </div>
    );
  }
}

CoreLayout.propTypes = propTypes;

export default CoreLayout;
