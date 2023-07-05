import { Route } from 'react-router-dom';
import { routes } from '@web/router';
import { ErrorElement } from './errorElement';
import Loading from '../loading';
import { lazy } from 'react';

const AsyncLogin = lazy(() => import('@web/pages/login'));
const AsyncNoufound = lazy(() => import('@web/pages/miss'));

/** 一维路由 */
const flatRoutes: RouteItem[] = [];
/** 多维路由拉平为一维 */
const pushInFlatRoutes = (
  routes: RouteItem[],
  container: RouteItem[],
  prefixPath: string = '',
) => {
  routes.forEach(route => {
    const item = { ...route };
    item.path = `${prefixPath}/${item.path.replace(/^\/+/, '')}`;
    container.push(item);
    if (item.children) {
      const prefixPath = item.path.replace(/\/+$/, '');
      pushInFlatRoutes(item.children, container, prefixPath);
    }
  });
};
pushInFlatRoutes(routes, flatRoutes);

/** 异步的动态路由列表 */
export const routeItems = flatRoutes.map(item => (
  <Route
    key={item.path}
    path={item.path}
    lazy={item.lazy}
    handle={item.handle}
    loader={item.loader}
    action={item.action}
    errorElement={item.errorElement ?? <ErrorElement />}
    element={<Loading>{item.element}</Loading>}
  />
));

// 登录路由
export const LoginRoute = (
  <Route
    path="/login"
    element={
      <Loading>
        <AsyncLogin />
      </Loading>
    }
  />
);

// 404路由
export const NotFoundRoute = (
  <Route
    path=":miss"
    element={
      <Loading>
        <AsyncNoufound />
      </Loading>
    }
  />
);
