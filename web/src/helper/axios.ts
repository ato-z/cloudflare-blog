import axios, { AxiosRequestConfig } from 'axios';
import { siteConfig } from '@web/config';

/** axios实例 */
export const axiosInstance = axios.create({
  baseURL: siteConfig.domain,
  headers: {},
});

let token: string | null = window.localStorage.getItem('token');
/** 获取token */
const getToken = async () => {
  if (token !== null) return token;
  return getTokenByZerg();
};
/** 从后端取token */
const getTokenByZerg = async () => {
  const sign = window.localStorage.getItem('sign');
  const result = await request<{ token: string }>({
    url: '/master/v1/token',
    headers: { sign },
  });

  window.localStorage.setItem('token', result.token);
  token = result.token;
  return token;
};

/** 发起请求前 */
axiosInstance.interceptors.request.use(async config => {
  const { url } = config;
  if (url === '/master/v1/token' || url === '/master/v1/login') return config;

  const token = await getToken();
  config.headers.token = token;

  return config;
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    const { response } = err;
    console.log('err', err);
    if (response?.data) return Promise.reject(response.data);
  },
);

/**
 * 发起请求
 * @param op
 */
export const request = <R>(op: AxiosRequestConfig) => {
  return <Promise<R>>axiosInstance(op);
};
