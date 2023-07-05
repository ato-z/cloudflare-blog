import { lazy } from 'react';
import { FieldNumberOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const ExceptionRouter: RouteItem = {
  label: '异常',
  icon: <FieldNumberOutlined />,
  path: '/exception',
  element: <Article />,
};
