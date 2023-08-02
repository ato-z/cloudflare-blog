import { lazy } from 'react';
import { FontSizeOutlined } from '@ant-design/icons';
import ArticleEdit from '@web/pages/article/edit';
import { articleDetail } from '@web/api';

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
    {
      label: '编辑',
      path: 'edit/:id',
      element: <ArticleEdit />,
      hide: true,
      async loader({ params }) {
        const { id } = params;
        const detail = await articleDetail(id!);
        const { title, subTitle, intro, tags, status } = detail;
        const initData = { title, subTitle, intro, tags, status };
        return { detail, initData };
      },
    },
  ],
};
