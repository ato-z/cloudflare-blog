import { lazy } from 'react';
import { FileImageOutlined } from '@ant-design/icons';

const ImagesList = lazy(() => import('@web/pages/images'));

export const ImagesRouter: RouteItem = {
  label: '图像',
  icon: <FileImageOutlined />,
  path: '/images',
  element: <ImagesList />,
  meta: {
    title: '图像',
    paths: [{ title: '图像', path: './' }],
  },
};
