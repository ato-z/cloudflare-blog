import { lazy } from 'react';
import { BookOutlined } from '@ant-design/icons';

const Note = lazy(() => import('@web/pages/note'));

export const NoteRouter: RouteItem = {
  label: '小记',
  icon: <BookOutlined />,
  path: '/note',
  element: <Note />,
  meta: {
    title: '小记',
    paths: [{ title: '小记', path: './' }],
  },
};
