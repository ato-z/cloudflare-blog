import { lazy } from 'react';
import { CommentOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const ObserverRouter: RouteItem = {
  label: '评论',
  icon: <CommentOutlined />,
  path: '/observer',
  element: <Article />,
};
