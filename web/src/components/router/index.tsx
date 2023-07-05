import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '@web/pages/auth';
import { IframeLayout } from '../layout';
import { routeItems, LoginRoute, NotFoundRoute } from './withItems';

export const AppRouter = () => (
  <Routes>
    {/* 主体框架 */}
    <Route
      path="/"
      element={
        <RequireAuth>
          <IframeLayout />
        </RequireAuth>
      }
    >
      {routeItems}
    </Route>

    {/* 登录页面 */}
    {LoginRoute}

    {/* 404 */}
    {NotFoundRoute}
    <Route />
  </Routes>
);

export default AppRouter;
