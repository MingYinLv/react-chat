// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import Main from './Main';
/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: '/',  // 路由地址
  component: CoreLayout,  // 布局组件
  indexRoute  : Main,
});

export default createRoutes;
