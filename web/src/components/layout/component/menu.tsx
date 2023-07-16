import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useTheme } from '@web/store/theme';
import { DayTime } from './day-time';
import { routes } from '@web/router';
import { useNavigate } from 'react-router-dom';
import { filterMenuItms } from '@web/helper';
const { Sider } = Layout;

const items = filterMenuItms(routes);
console.log(items);
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
