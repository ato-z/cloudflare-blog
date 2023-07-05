import { lazy } from 'react';
import { FileImageOutlined } from '@ant-design/icons';

const Article = lazy(() => import('@web/pages/article'));

export const ImagesRouter: RouteItem = {
  label: '图像',
  icon: <FileImageOutlined />,
  path: '/images',
  element: <Article />,
};
