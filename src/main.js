import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'immutable';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

// ========================================================
// 浏览器路由设置
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

// ========================================================
// Store and History Instantiation Store 和 History 初始化
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
// 创建 store 并且将路由状态同步到 store
// 需安装 react-router-redux 的 reducer 到 reducers 中，key 为 "router"，路由文件为 src/routers/index.js
//
// const initialState = window.___INITIAL_STATE__
const initialState = new Immutable.Map({});
const store = createStore(initialState, browserHistory);
// socket(store);
const history = syncHistoryWithStore(browserHistory, store, {
  /**
   * 手动修改 state 中路由状态的函数， (state) => state.router
   * https://github.com/reactjs/react-router-redux
   * @param state
   */
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
});

// ========================================================
// 开发者工具
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store);

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
    />,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
}

// ========================================================
// Go!
// ========================================================
render();
