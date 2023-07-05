import { MenuProps } from 'antd';

/**
 * 设置页面标题
 */
export const upDocumentTitle = (title: string) => {
  document.title = title;
};

/**
 * 补零操作
 */
export const fillZero = (n: number | string) => {
  const codeN = n.toString();
  return codeN.length > 1 ? n : '0' + n;
};

/** Menu组件item项数据结构 */
type MenuItem = Required<MenuProps>['items'][number];
export const touchItem = (
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
) => ({ label, key, icon, children, type });

/**
 * 根据配置过滤并生成对应的menu列表
 */
export const filterMenuItms = (
  list: RouteItem[],
): Array<ReturnType<typeof touchItem>> =>
  list
    .filter(item => item.hide !== true)
    .map(item => {
      const children = item.children
        ? filterMenuItms(item.children)
        : undefined;
      return touchItem(item.label, item.path, item.icon, children);
    });
