import {combineReducers} from 'redux-immutable';
import routing from '../routes/rootReducer';
import main from '../routes/Main/modules/main';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing,
    main,
    ...asyncReducers,
  });
};

/**
 * 异步加载 reducer
 * @param store 应用 state
 * @param key reducer 的名称
 * @param reducer reducer 函数
 */
export const injectReducer = (store, {key, reducer}) => {
  if (!store.asyncReducers[key]) {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
  }
};

export default makeRootReducer;
