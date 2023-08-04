import { baseURL, getToken, request } from '@web/helper/axios';

/**
 * 返回数据库中所有的数据表
 */
export const databaseTablesGet = () => {
  const url = 'database/v1/tables';
  return request<Array<{ name: string }>>({
    url,
  });
};

/**
 * 下载当前数据库
 */
export const databaseDumpGet = async () => {
  const token = await getToken();
  const url = `${baseURL}/database/v1/dump?token=${token}`;
  return url;
};

/**
 * 返回指定表中的所有数据列表
 */
export const databaseTableDataGet = async (params: {
  tableName: string;
  start: number;
  end: number;
}) => {
  const url = 'database/v1/list';
  return request<{ total: number; list: Array<any> }>({
    url,
    params,
  });
};

/**
 * 编辑表数据
 */
export const databaseTableDataEditPatch = async (
  tableName: string,
  id: number,
  data: any,
) => {
  const url = 'database/v1/edit';
  const method = 'PATCH';
  return request<{ total: number; list: Array<any> }>({
    url,
    method,
    data: { id, data, tableName },
  });
};

/**
 * 删除表数据
 */
export const databaseTableDataRemove = async (
  tableName: string,
  id: number,
) => {
  const url = 'database/v1/remove';
  const method = 'DELETE';
  return request<{ total: number; list: Array<any> }>({
    url,
    method,
    params: { id, tableName },
  });
};
