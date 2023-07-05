import { lazy } from 'react';
import { BookOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const NoteRouter: RouteItem = {
  label: '小记',
  icon: <BookOutlined />,
  path: '/note',
  element: <Article />,
};
