import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useTheme } from '@web/store/theme';
import { DayTime } from './day-time';
import { items } from './menu-list';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;

/**
 * 左侧菜单
 */
export const SiderMenu = () => {
  const [themeJotai] = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
        defaultSelectedKeys={['1']}
        items={items}
        onSelect={item => {
          navigate(item.key);
        }}
      />
    </Sider>
  );
};
