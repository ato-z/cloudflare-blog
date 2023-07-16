import { lazy } from 'react';
import { FontSizeOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));
const ArticlePush = lazy(() => import('@web/pages/article/push'));

export const ArticleRouter: RouteItem = {
  label: '笔记',
  icon: <FontSizeOutlined />,
  path: '/article',
  element: <Article />,
  children: [
    {
      label: '添加',
      path: 'push',
      element: <ArticlePush />,
      hide: true,
    },
  ],
};
