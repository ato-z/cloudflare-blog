import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useTheme } from '@web/store/theme';
import { DayTime } from './day-time';
const { Sider } = Layout;

/**
 * 左侧菜单
 */
export const SiderMenu = () => {
  const [themeJotai] = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      theme={themeJotai}
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <DayTime />
      <Menu
        theme={themeJotai}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      />
    </Sider>
  );
};
