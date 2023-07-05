import { Layout, Avatar, Space, Button } from 'antd';

export const Header = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <Layout.Header style={{ backgroundColor }}>
      <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
        <Avatar size={40}>U</Avatar>
        <Button type="link">超级管理员</Button>
      </Space>
    </Layout.Header>
  );
};
