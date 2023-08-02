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
export type ArticleProp = {
  title: string;
  subTitle: string;
  intro: string;
  cover: number;
  tags: string;
  status: 0 | 1;
  content: string;
  pubDate: string;
  deleteDate?: string;
};
export type ArticleDetailProp = ArticleProp & {
  id: number;
  cover: {
    id: number;
    path: string;
    thumb?: string;
    width: number;
    height: number;
    size: number;
    color: string;
  };
};
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
export const articleAdd = (data: ArticleProp) => {
  const url = '/article/v1/add';
  const method = 'POST';
  return request<unknown>({ url, method, data });
};

/**
 * 笔记详情
 */
export const articleDetail = (id: string | number) => {
  const url = '/article/v1/detail';
  return request<ArticleDetailProp>({ url, params: { id } });
};

/**
 * 编辑笔记
 */
export const articleEdit = (
  id: string | number,
  data: Partial<ArticleProp>,
) => {
  const url = '/article/v1/edit';
  const method = 'PATCH';
  return request<unknown>({ url, method, data: { ...data, id } });
};

/**
 * 删除笔记
 */
export const articleRemove = (id: string | number) => {
  const url = '/article/v1/remove';
  const method = 'PATCH';
  return request<unknown>({ url, method, params: { id } });
};
