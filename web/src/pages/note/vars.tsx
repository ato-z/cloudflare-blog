import { noteRemove } from '@web/api';
import { Button, Input, Popconfirm, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

/**
 * 小记列表检索项
 */
export const noteSearchProps = [
  { name: 'title', label: '标题', element: <Input /> },
  { name: 'tags', label: '标签', element: <Input /> },
];

/**
 * 表格项
 */
export const noteColumn: (
  tap: (action: 'edit' | 'reload', row: any) => void,
) => ColumnsType<DataType> = tap => [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    render(content) {
      return (
        <div style={{ maxWidth: '500px' }}>
          <Typography.Paragraph ellipsis={{ rows: 1 }}>
            {content}
          </Typography.Paragraph>
        </div>
      );
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
  },
  {
    title: '操作',
    key: 'action',
    render: row => (
      <Space size="middle">
        <Popconfirm
          title="温馨提醒"
          description="是否删除该小记？"
          onConfirm={async () => {
            await noteRemove(row.id);
            tap('reload', row);
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button type={'link'} danger>
            删除
          </Button>
        </Popconfirm>
        <Button type={'link'} onClick={() => tap('edit', row)}>
          编辑
        </Button>
      </Space>
    ),
  },
];

type NoteProp = {
  markdown: JSX.Element;
};
/**
 * 添加/编辑小记
 */
export const noteProps = ({ markdown }: NoteProp) => {
  return [
    {
      label: '标题',
      name: 'title',
      element: <Input />,
      rules: [{ required: true }],
    },
    {
      label: '标签',
      name: 'tags',
      element: <Input.TextArea />,
      rules: [{ required: true }],
    },
    {
      label: '内容',
      name: 'content',
      element: markdown,
    },
  ];
};
