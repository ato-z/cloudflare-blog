import { Layout, Avatar, Space } from 'antd';

export const Header = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <Layout.Header style={{ backgroundColor }}>
      <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
        <Avatar size={40}>U</Avatar>
        <small>超级管理员</small>
      </Space>
    </Layout.Header>
  );
};
