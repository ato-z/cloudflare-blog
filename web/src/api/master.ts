import { request } from '@web/helper/axios';

/**
 * 登录并返回sign
 */
export const loginPost = (data: { user: string; password: string }) => {
  const url = `/master/v1/login`;
  return request<{ sign: string }>({ url, method: 'post', data });
};
