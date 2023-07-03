import { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

/**
 * 左侧菜单
 */
export const SiderMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" />
    </Sider>
  );
};
