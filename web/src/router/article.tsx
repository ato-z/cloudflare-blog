import { lazy } from 'react';
import { FontSizeOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const ArticleRouter: RouteItem = {
  label: '笔记',
  icon: <FontSizeOutlined />,
  path: '/article',
  element: <Article />,
};
