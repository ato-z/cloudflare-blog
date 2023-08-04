import { request } from '@web/helper/axios';
export type ExceptionProp = {
  body: string;
  createDate: string;
  header: string;
  id: number;
  message: string;
  method: string;
  params: string;
  stack: string;
  url: string;
};
export const exceptionListGet = (params: { start?: number; end?: number }) => {
  const url = 'exception/v1/list';
  return request<{ total: number; list: Array<ExceptionProp> }>({
    url,
    params,
  });
};
