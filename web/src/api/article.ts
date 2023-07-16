/**
 * 笔记
 */
import { request } from '@web/helper/axios';

/**
 * 笔记列表
 */
export type ArticleSimpleList = Array<{
  id: number;
  title: string;
  subTitle: string;
  tags: string;
  intro: string;
  pubDate: string;
  createDate: string;
}>;
export const articleList = (params: {
  start?: number;
  end?: number;
  title?: string;
  tags?: string;
}) => {
  const url = 'article/v1/list';
  return request<{ total: number; list: ArticleSimpleList }>({ url, params });
};

/**
 * 添加笔记
 */
export const articleAdd = (data: {
  title: string;
  subTitle: string;
  intro: string;
  cover: number;
  tags: string;
  pubDate: string;
  status: 0 | 1;
  content: string;
}) => {
  const url = '/article/v1/add';
  const method = 'POST';
  return request<unknown>({ url, method, data });
};
