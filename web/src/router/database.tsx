import { lazy } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const DatabaseRouter: RouteItem = {
  label: '数据',
  icon: <DatabaseOutlined />,
  path: '/database',
  element: <Article />,
};
