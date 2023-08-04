import { lazy } from 'react';
import { FieldNumberOutlined } from '@ant-design/icons';

const ExceptionList = lazy(() => import('@web/pages/exception'));

export const ExceptionRouter: RouteItem = {
  label: '异常',
  icon: <FieldNumberOutlined />,
  path: '/exception',
  element: <ExceptionList />,
};
