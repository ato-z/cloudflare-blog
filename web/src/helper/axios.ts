import axios, { AxiosRequestConfig } from 'axios';
import { siteConfig } from '@web/config';

/** axios实例 */
export const axiosInstance = axios.create({
  baseURL: 'http://www.baidu.com', //siteConfig.domain,
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
  return result.token;
};

/** 发起请求前 */
axiosInstance.interceptors.request.use(async config => {
  const { url } = config;
  if (url === '/master/v1/token' || url === '/master/v1/login') return config;

  const { headers } = config;
  const token = await getToken();
  headers.token = token;

  return config;
});

axiosInstance.interceptors.response.use(
  res => res.data,
  async err => {
    if (!err.response) return Promise.reject(err);

    console.log(err);
    const { response, code } = err;
    const { url, method } = err.config;
    const { status } = response;
    if (response?.data) {
      const data: { errorCode: number } = response.data;

      // sign失效， 重登
      if (data.errorCode === 3000) {
        const { location } = window;
        window.localStorage.removeItem('sign');
        if (location.pathname !== '/login') {
          location.reload();
        }
      }

      // token失效, 刷新token并重发
      if (data.errorCode === 4000) {
        await getTokenByZerg();
        return axiosInstance(response.config);
      }

      return Promise.reject({ ...data, method, status, code, url });
    }

    return Promise.reject(err);
  },
);

/**
 * 发起请求
 * @param op
 */
export const request = <R>(op: AxiosRequestConfig) => {
  return <Promise<R>>axiosInstance(op);
};
