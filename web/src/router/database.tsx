import { lazy } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const DataBaseIndex = lazy(() => import('@web/pages/database'));
const TableView = lazy(() => import('@web/pages/database/table-view'));
export const DatabaseRouter: RouteItem = {
  label: '数据',
  icon: <DatabaseOutlined />,
  path: '/database',
  element: <DataBaseIndex />,
  meta: {
    title: '数据',
    paths: [{ title: '数据', path: './' }],
  },
  children: [
    {
      label: '表详情',
      path: ':tableName',
      element: <TableView />,
      hide: true,
      meta: {
        title: '表信息',
        paths: [
          { title: '数据', path: '/database' },
          { title: '表信息', path: './' },
        ],
      },
    },
  ],
};
