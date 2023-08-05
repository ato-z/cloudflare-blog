import { HomeOutlined } from '@ant-design/icons';
import AppImage from '@web/components/image';
import { useMaster } from '@web/store/master';
import { useNavs } from '@web/store/navs';
import { Layout, Avatar, Space, Typography, Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';

export const Header = ({ backgroundColor }: { backgroundColor: string }) => {
  const [master] = useMaster();
  const [navs] = useNavs();
  const [breadcrumb, setBreadcrumb] = useState<
    Array<{ title: string | JSX.Element }>
  >([]);

  useEffect(() => {
    const items = [
      {
        href: '/',
        title: <HomeOutlined />,
      },
      ...navs.map(nav => ({ title: nav.title })),
    ];
    setBreadcrumb(items);
  }, [navs]);

  return (
    <Layout.Header style={{ backgroundColor }}>
      {master !== null && (
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Breadcrumb items={breadcrumb}></Breadcrumb>
          <Space>
            <Avatar src={<AppImage src={master?.cover?.path} />} size={40}>
              {master.name[0].toLocaleUpperCase()}
            </Avatar>

            <Typography.Text>{master.nickname} </Typography.Text>
          </Space>
        </Space>
      )}
    </Layout.Header>
  );
};
