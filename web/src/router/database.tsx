import { lazy } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const DataBaseIndex = lazy(() => import('@web/pages/database'));
const TableView = lazy(() => import('@web/pages/database/table-view'));
export const DatabaseRouter: RouteItem = {
  label: '数据',
  icon: <DatabaseOutlined />,
  path: '/database',
  element: <DataBaseIndex />,
  children: [
    {
      label: '表详情',
      path: ':tableName',
      element: <TableView />,
      hide: true,
    },
  ],
};
