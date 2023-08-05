import { lazy } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { masterDataGet } from '@web/api';
import RePass from '@web/pages/self/repass';

const SelfProfile = lazy(() => import('@web/pages/self/profile'));

export const SelfRouter: RouteItem = {
  label: '个人',
  icon: <GithubOutlined />,
  path: '/self',
  element: <SelfProfile />,
  meta: {
    title: '个人中心',
    paths: [{ title: '个人中心', path: '/self' }],
  },
  children: [
    {
      label: '设置',
      path: '/profile',
      element: <SelfProfile />,
      meta: {
        title: '个人设置',
        paths: [
          { title: '个人中心', path: '/self' },
          { title: '设置', path: './' },
        ],
      },
      loader: async () => {
        const master = await masterDataGet();
        return master;
      },
    },
    {
      label: '修改密码',
      path: '/repass',
      element: <RePass />,
      meta: {
        title: '个人设置',
        paths: [
          { title: '个人中心', path: '/self' },
          { title: '修改密码', path: './' },
        ],
      },
    },
  ],
};
