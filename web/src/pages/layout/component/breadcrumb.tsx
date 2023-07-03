import { Breadcrumb as AntdBreadcrumb } from 'antd';

export const Breadcrumb = () => {
  return (
    <AntdBreadcrumb style={{ padding: '10px 0' }}>
      <AntdBreadcrumb.Item>User</AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>Bill</AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  );
};
