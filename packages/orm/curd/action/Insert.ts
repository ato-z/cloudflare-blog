/* eslint-disable @typescript-eslint/naming-convention */
import { filterSqlVal } from '../core/filterSqlVal';

const isObj = (target: unknown): boolean =>
  Object.prototype.toString.call(target) === '[object Object]';

/**
 * 新增语句 INSERT INTO \`${tableName}\` (${fields})
 * @param fields
 * @param tableName
 * @returns
 */
const withInsertFrom = <T>(
  fields: Array<keyof T & string>,
  tableName: string,
) => {
  const fieldsLeft = fields.map(field => `\`${field}\``);
  const sqlFront = `INSERT INTO \`${tableName}\` (${fieldsLeft.join(',')})`;
  return sqlFront;
};

/**
 * 传入的数据统一数组的方式返回，数组内的子项必须是一个对象
 * @param data
 * @returns
 */
const filterDatas = <T extends object>(data: T | T[]): T[] => {
  if (!Array.isArray(data)) {
    data = [data];
  }

  data?.forEach(element => {
    if (!isObj(element)) {
      throw new TypeError(`新增数据必须为一个js对象，不能为 ${typeof element}`);
    }
  });

  return data;
};

/**
 * 根据传入的key数组来校验data数据是否合法
 * @param keys
 * @param data
 */
const seekDataKey = (keys: string[], element: object) => {
  const data = { ...element };
  const thatKeys = Object.keys(data);
  const errMsg = `要求key为[${keys.join(',')}]\n接受到${JSON.stringify(data)}`;
  const dataMap = new Map();
  thatKeys.forEach(key => {
    dataMap.set(key, true);
  });
  if (thatKeys.length !== keys.length) {
    throw new TypeError('数据长度不一致\n' + errMsg);
  }

  keys.forEach(key => {
    if (!dataMap.has(key)) {
      throw new TypeError(`缺少键 ${key}\n` + errMsg);
    }
  });
  return data;
};

/**
 * 新增语句 VALUES (value1, value2, value3)
 * @param fields
 * @param list
 * @returns
 */
const withInsertData = (fields: string[], list: object[]): string => {
  const vals: string[] = [];
  list.forEach(item => {
    const itemVal: Array<string | number> = [];
    fields.forEach(key => {
      const val = filterSqlVal(Reflect.get(item, key), key);
      itemVal.push(val);
    });
    vals.push(`(${itemVal.join(',')})`);
  });
  return vals.join(',');
};

/**
 * 组合新增的sql语句
 * @param fields
 * @param tableName
 * @param list
 * @returns
 */
const withInsertSql = (fields: string[], tableName: string, list: object[]) => {
  const insertFrom = withInsertFrom<Record<string, unknown>>(fields, tableName);
  const insertVals = withInsertData(fields, list);
  return `${insertFrom} VALUES ${insertVals}`;
};

export const Insert = <T extends object>(tableName: string, datas: T | T[]) => {
  const insertDatas = filterDatas(datas);
  const insertFields = Object.keys(insertDatas[0]);
  const insertList = insertDatas.map(element =>
    seekDataKey(insertFields, element),
  );
  const insertSql = withInsertSql(insertFields, tableName, insertList);
  return insertSql;
};
