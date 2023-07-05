import { lazy } from 'react';
import { FrownOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const PasserbyRouter: RouteItem = {
  label: '游客',
  icon: <FrownOutlined />,
  path: '/passerby',
  element: <Article />,
};
