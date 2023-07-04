import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '@web/pages/auth';
import { IframeLayout } from '../layout';
import Loading from '../loading';

const Home = lazy(() =>
  import('../../pages/home').then(home => {
    return new Promise(resolve => {
      setTimeout(resolve, 10000, home);
    });
  }),
);
const Login = lazy(() => import('../../pages/login'));
const NotFoundPage = lazy(() => import('../../pages/miss'));
const ArticleList = lazy(() => import('../../pages/article'));

export const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <IframeLayout />
        </RequireAuth>
      }
    >
      <Route
        path="/"
        element={
          <Loading>
            <Home />
          </Loading>
        }
      />
      <Route
        path="/article"
        element={
          <Loading>
            <ArticleList />
          </Loading>
        }
      />
    </Route>

    {/* 登录页面 */}
    <Route
      path="/login"
      element={
        <Loading>
          <Login />
        </Loading>
      }
    />

    {/* 404 */}
    <Route
      path=":miss"
      element={
        <Loading>
          <NotFoundPage />
        </Loading>
      }
    />
    <Route />
  </Routes>
);

export default AppRouter;
