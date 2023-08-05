import { lazy } from 'react';
import { FontSizeOutlined } from '@ant-design/icons';
import { articleDetail } from '@web/api';

const Article = lazy(() => import('@web/pages/article'));
const ArticlePush = lazy(() => import('@web/pages/article/push'));
const ArticleEdit = lazy(() => import('@web/pages/article/edit'));

export const ArticleRouter: RouteItem = {
  label: '笔记',
  icon: <FontSizeOutlined />,
  path: '/article',
  element: <Article />,
  meta: {
    title: '笔记',
    paths: [{ title: '笔记', path: './' }],
  },
  children: [
    {
      label: '添加',
      path: 'push',
      element: <ArticlePush />,
      hide: true,
      meta: {
        title: '笔记添加',
        paths: [
          { title: '笔记', path: '/article' },
          { title: '笔记添加', path: './' },
        ],
      },
    },
    {
      label: '编辑',
      path: 'edit/:id',
      element: <ArticleEdit />,
      hide: true,
      meta: {
        title: '笔记编辑',
        paths: [
          { title: '笔记', path: '/article' },
          { title: '笔记编辑', path: './' },
        ],
      },
      async loader({ params }) {
        const { id } = params;
        const detail = await articleDetail(id!);
        detail.cover = detail.cover ?? {};
        const { title, subTitle, intro, tags, status } = detail;
        const initData = { title, subTitle, intro, tags, status };
        return { detail, initData };
      },
    },
  ],
};
