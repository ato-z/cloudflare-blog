import { Input, Select, DatePicker } from 'antd';
import ArticleStatus from './component/status';
import UploadImage from '@web/components/uploadImage';
import dayjs from 'dayjs';

/**
 * 笔记列表检索项
 */
export const articleSearchProps = [
  { name: 'title', label: '标题', element: <Input /> },
  { name: 'tags', label: '标签', element: <Input /> },
  { name: 'status', label: '状态', element: ArticleStatus },
];

/**
 * 编辑或添加笔记
 */
type ArticleProp = {
  uploadSuccess: (key: string, result: any) => void;
  cover: string;
  pubDate?: string;
};
export const articleProps: (op: ArticleProp) => FormItem[] = ({
  uploadSuccess,
  cover,
  pubDate,
}) => [
  {
    label: '封面',
    name: 'cover',
    element: (
      <UploadImage
        cover={cover}
        onSuccess={result => uploadSuccess('cover', result)}
      />
    ),
    // rules: [{ required: true }],
  },
  {
    label: '标题',
    name: 'title',
    element: <Input />,
    rules: [{ required: true }],
  },
  {
    label: '短标题',
    name: 'subTitle',
    element: <Input />,
    rules: [{ require: true }],
  },

  {
    label: '简介',
    name: 'intro',
    element: <Input.TextArea />,
    rules: [{ required: true }],
  },
  {
    label: '标签',
    name: 'tags',
    element: <Input.TextArea />,
    rules: [{ required: true }],
  },
  {
    label: '发布时间',
    name: 'pubDate',
    element: (
      <DatePicker
        format="YYYY/MM/DD"
        defaultValue={pubDate ? dayjs(pubDate, 'YYYY/MM/DD') : undefined}
      />
    ),
  },
  {
    label: '状态',
    name: 'status',
    element: (
      <Select style={{ minWidth: '100px' }}>
        <Select.Option value={1}>发布</Select.Option>
        <Select.Option value={0}>草稿</Select.Option>
      </Select>
    ),
  },
];
export type ArticleProps = {
  title: string;
  subTitle: string;
  intro: string;
  cover: number;
  tags: string;
  pubDate: string;
  status: 0 | 1;
};
