import { lazy } from 'react';
import { HomeOutlined } from '@ant-design/icons';

const Home = lazy(() => import('@web/pages/home'));

export const HomeRouter: RouteItem = {
  label: '首页',
  icon: <HomeOutlined />,
  path: '/',
  element: <Home />,
  meta: {
    title: '首页',
    paths: [{ title: '首页', path: './' }],
  },
};
