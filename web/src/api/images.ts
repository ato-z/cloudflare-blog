import { request } from '@web/helper/axios';

/**
 * 获取数据库中的图像列表
 */
export type ImageProp = {
  id: number;
  color: string;
  createDate: string;
  from: number;
  hash: string;
  height: number;
  path: string;
  size: number;
  thumb: string;
  width: number;
};
export const imageListGet = (params: { start?: number; end?: number }) => {
  const url = '/upload/v1/img/list';
  return request<{
    list: Array<ImageProp>;
    total: number;
  }>({ url, params });
};
