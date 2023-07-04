import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import { SiderMenu } from './component/menu';
import { Header } from './component/header';
import { Footer } from './component/footer';
const { Content } = Layout;

const iframeStyle = { minHeight: '100vh' };
const outletStyle = {
  padding: 18,
  minHeight: '100%',
  borderRadius: '0 0 8px 8px',
};

export const IframeLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={iframeStyle}>
      {/* 左侧导航 */}
      <SiderMenu />

      <Layout>
        {/* 头部 */}
        <Header backgroundColor={colorBgContainer} />

        <Content style={{ margin: '20px 16px 0' }}>
          {/* 路由内容插槽 */}
          <div style={{ ...outletStyle, backgroundColor: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>

        {/* 底部 */}
        <Footer />
      </Layout>
    </Layout>
  );
};
