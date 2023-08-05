import { routes } from '@web/router';
import { ErrorElement } from './errorElement';
import Loading from '../loading';
import { lazy } from 'react';

// 登录路由
const AsyncLogin = lazy(() => import('@web/pages/login'));
export const LoginElement = (
  <Loading>
    <AsyncLogin />
  </Loading>
);

// 404路由
const AsyncNoufound = lazy(() => import('@web/pages/miss'));
export const NotFoundElement = (
  <Loading>
    <AsyncNoufound />
  </Loading>
);

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
export const routeChildren = flatRoutes.map(item => ({
  path: item.path,
  label: item.label,
  meta: item.meta,
  lazy: item.lazy,
  handle: item.handle,
  loader: item.loader,
  action: item.action,
  errorElement: item.errorElement ?? <ErrorElement />,
  element: <Loading>{item.element}</Loading>,
}));
