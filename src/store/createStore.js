import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import socket from '../util/redux-socket';
import { makeRootReducer } from './reducers';

export default (initialState = Immutable.fromJS({}), history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [socket('localhost:3030'),
    thunk, routerMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;

      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
