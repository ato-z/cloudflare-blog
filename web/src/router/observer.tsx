import { lazy } from 'react';
import { CommentOutlined } from '@ant-design/icons';

const ObserverList = lazy(() => import('@web/pages/observer'));

export const ObserverRouter: RouteItem = {
  label: '评论',
  icon: <CommentOutlined />,
  path: '/observer',
  element: <ObserverList />,
  meta: {
    title: '评论',
    paths: [{ title: '评论', path: './' }],
  },
};
