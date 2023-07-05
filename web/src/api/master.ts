import { request } from '@web/helper/axios';

/**
 * 登录并返回sign
 */
export const loginPost = (data: { user: string; password: string }) => {
  const url = '/master/v1/login';
  return request<{ sign: string }>({ url, method: 'post', data });
};

/**
 * 返回管理员信息
 */
export const masterDataGet = () => {
  const url = '/master/v1/data';
  return request({ url });
};
