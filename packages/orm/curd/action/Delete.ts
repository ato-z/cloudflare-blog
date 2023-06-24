/* eslint-disable @typescript-eslint/naming-convention */
import { withWhere } from '../core/WithWhere';
import type { DeleteOption } from './Option';

export const _Delete = <T>(tableName: string, quest: DeleteOption<T> = {}) => {
  const { where, order, limit, join } = quest;
  const sqlContainer = [`DELETE FROM \`${tableName}\``];

  /** 组合where条件 */
  const whereSql = withWhere(where?.and, where?.or, join);
  if (whereSql !== undefined) {
    sqlContainer.push(whereSql);
  }

  /** 排序 */
  if (order !== undefined) {
    sqlContainer.push(`ORDER BY ${order[0]} ${order[1]}`);
  }

  /** 行数 */
  if (limit !== undefined) {
    sqlContainer.push(`LIMIT ${limit}`);
  }

  return sqlContainer.join(' ');
};
