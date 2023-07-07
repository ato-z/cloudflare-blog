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
  return request<Master>({ url });
};

/**
 * 编辑管理员信息
 */
export const masterEdit = (data: {
  nickname?: string;
  intro?: string;
  cover?: number;
}) => {
  const url = '/master/v1/edit';
  return request<null>({ url, method: 'PATCH', data });
};

/**
 * 修改管理员密码
 */
export const masterRePass = (data: {
  password: string;
  oldPassword: string;
  rePassword: string;
}) => {
  const url = '/master/v1/repass';
  return request<null>({ url, method: 'PATCH', data });
};
