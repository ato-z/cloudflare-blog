import { request } from '@web/helper/axios';

type NoteList = Array<{
  id: number;
  title: string;
  tags: string;
  updateDate: string;
  createDate: string;
}>;
/**
 * 小记列表
 */
export const noteList = (params: {
  start?: number;
  end?: number;
  title?: string;
  tags?: string;
}) => {
  const url = 'note/v1/list';
  return request<{ total: number; list: NoteList }>({ url, params });
};

/**
 * 添加小记
 */
export type NoteProp = {
  title: string;
  tags: string;
  content: string;
};
export const noteAdd = (data: NoteProp) => {
  const url = '/note/v1/add';
  const method = 'POST';
  return request<unknown>({ url, method, data });
};

/**
 * 编辑小记
 */
export const noteEdit = (data: Partial<NoteProp>) => {
  const url = '/note/v1/edit';
  const method = 'PATCH';
  return request<unknown>({ url, method, data: { ...data } });
};

/**
 * 删除小记
 */
export const noteRemove = (id: string | number) => {
  const url = '/note/v1/remove';
  const method = 'PATCH';
  return request<unknown>({ url, method, params: { id } });
};
