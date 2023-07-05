import { MenuProps, message } from 'antd';
import { isResponseError } from './assert';

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
  prefixPath = '',
): Array<ReturnType<typeof touchItem>> =>
  list
    .filter(item => item.hide !== true)
    .map(item => {
      const path = `${prefixPath}/${item.path.replace(/^\/+/, '')}`;
      const parent = path.replace(/\/+$/, '');
      const children = item.children
        ? filterMenuItms(item.children, parent)
        : undefined;

      return touchItem(item.label, path, item.icon, children);
    });

/**
 * 捕获异常
 */
export const tailErr = (err: unknown) => {
  message.destroy();
  if (typeof err === 'string') {
    message.error(err);
  } else if (err instanceof Error) {
    message.error(err.message);
  } else if (isResponseError(err)) {
    message.error(err.message);
  } else {
    console.log(err);
    message.error('网络异常');
  }
};
