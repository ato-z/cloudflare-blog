import { RequireAuth } from '@web/pages/auth';
import { createBrowserRouter } from 'react-router-dom';
import { IframeLayout } from '../layout';
import { routeChildren, LoginElement, NotFoundElement } from './withItems';

const appRouter = createBrowserRouter([
  // 框架路由
  {
    path: '/',
    element: (
      <RequireAuth>
        <IframeLayout />
      </RequireAuth>
    ),
    children: routeChildren,
  },
  // 登录路由
  {
    path: '/login',
    element: LoginElement,
  },
  // 404路由
  {
    path: ':miss',
    element: NotFoundElement,
  },
]);

export default appRouter;
