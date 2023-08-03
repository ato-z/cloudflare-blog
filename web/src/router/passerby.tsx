import { lazy } from 'react';
import { FrownOutlined } from '@ant-design/icons';

const PasserbyList = lazy(() => import('@web/pages/passerby'));

export const PasserbyRouter: RouteItem = {
  label: '游客',
  icon: <FrownOutlined />,
  path: '/passerby',
  element: <PasserbyList />,
};
