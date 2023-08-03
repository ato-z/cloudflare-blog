import { RequireAuth } from '@web/pages/auth';
import { createBrowserRouter } from 'react-router-dom';
import { IframeLayout } from '../layout';
import { routeChildren, LoginElement, NotFoundElement } from './withItems';
import { ErrorElement } from './errorElement';

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
    errorElement: <ErrorElement />,
  },
  // 登录路由
  {
    path: '/login',
    element: LoginElement,
    errorElement: <ErrorElement />,
  },
  // 404路由
  {
    path: ':miss',
    element: NotFoundElement,
    errorElement: <ErrorElement />,
  },
]);

export default appRouter;
