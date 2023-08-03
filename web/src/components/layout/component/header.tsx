import AppImage from '@web/components/image';
import { useMaster } from '@web/store/master';
import { Layout, Avatar, Space, Typography } from 'antd';

export const Header = ({ backgroundColor }: { backgroundColor: string }) => {
  const [master] = useMaster();
  return (
    <Layout.Header style={{ backgroundColor }}>
      {master !== null && (
        <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Avatar src={<AppImage src={master?.cover?.path} />} size={40}>
            {master.name[0].toLocaleUpperCase()}
          </Avatar>

          <Typography.Text>{master.nickname} </Typography.Text>
        </Space>
      )}
    </Layout.Header>
  );
};
