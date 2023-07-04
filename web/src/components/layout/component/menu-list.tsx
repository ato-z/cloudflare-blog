import { MenuProps } from 'antd';
import {
  HomeOutlined,
  CommentOutlined,
  BookOutlined,
  GithubOutlined,
  FontSizeOutlined,
  FrownOutlined,
  DatabaseOutlined,
  FileImageOutlined,
  FieldNumberOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const touchItem = (
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
) => ({ label, key, icon, children, type });

export const items: MenuItem[] = [
  touchItem('首页', '/', <HomeOutlined />),
  touchItem('笔记', '/article', <FontSizeOutlined />),
  touchItem('评论', '/observer', <CommentOutlined />),
  touchItem('小记', '/note', <BookOutlined />),
  touchItem('异常', '/exception', <FieldNumberOutlined />),
  touchItem('游客', '/passerby', <FrownOutlined />),
  touchItem('图像', '/images', <FileImageOutlined />),
  touchItem('数据', '/database', <DatabaseOutlined />),
  touchItem('个人', '/self', <GithubOutlined />),
];
