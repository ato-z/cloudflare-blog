import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

export const tablesColumn: () => ColumnsType<{ name: string }> = () => [
  {
    title: '表名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    key: 'action',
    render(row) {
      return (
        <Space size="middle">
          <Link to={`./${row.name}`}>查看</Link>
        </Space>
      );
    },
  },
];
