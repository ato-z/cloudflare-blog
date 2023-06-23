/* eslint-disable @typescript-eslint/naming-convention */
import { withWhere } from '../core/WithWhere';
import type { SelectOption } from './Option';

export const Select = <T>(tableName: string, option: SelectOption<T> = {}) => {
  const { field = '*', where, order, limit } = option;
  const fieldProp: string =
    field instanceof Array ? field?.map(f => `\`${f}\``).join(',') : field;
  const sqlSelectFrom = [`SELECT ${fieldProp} FROM \`${tableName}\``];
  /** 组合where条件 */
  if (where !== undefined) {
    sqlSelectFrom.push(withWhere(where.and, where.or, option.join));
  }

  /** 排序 */
  if (order !== undefined) {
    sqlSelectFrom.push(`ORDER BY ${order[0]} ${order[1]}`);
  }

  /** 行数 */
  if (Array.isArray(limit)) {
    sqlSelectFrom.push(`LIMIT ${limit.join(',')}`);
  }

  if (limit && /^\d+$/.test(limit.toString())) {
    sqlSelectFrom.push(`LIMIT 0,${limit as number}`);
  }

  return sqlSelectFrom.join(' ');
};
