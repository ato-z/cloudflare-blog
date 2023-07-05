import { lazy } from 'react';
import { GithubOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const SelfRouter: RouteItem = {
  label: '个人',
  icon: <GithubOutlined />,
  path: '/self',
  element: <Article />,
};
