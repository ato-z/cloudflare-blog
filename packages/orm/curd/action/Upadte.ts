/* eslint-disable @typescript-eslint/naming-convention */
import type { UpdateOption } from './Option';
import { withWhere } from '../core/WithWhere';
import { filterSqlVal } from '../core/filterSqlVal';

/**
 * UPDATE 所更新的字段
 */
const withUpdateSet = (updata: object): string => {
  const keys = Object.keys(updata).filter(key => updata[key] !== undefined);
  return keys
    .map(key => {
      const val = filterSqlVal(Reflect.get(updata, key), key);
      return `\`${key}\`=${val}`;
    })
    .join(',');
};

export const Update = <T extends object>(
  tableName: string,
  updata: Partial<T>,
  quest: UpdateOption<T> = {},
) => {
  const updateFrom = `UPDATE \`${tableName}\``;
  const updateSet = withUpdateSet(updata);
  const sqlContainer = [`${updateFrom} SET ${updateSet}`];

  const { where, join, limit, order } = quest;

  /** 组合where条件 */
  const whereSql = withWhere(where?.and, where?.or, join);
  if (whereSql !== undefined) {
    sqlContainer.push(whereSql);
  }

  /** 排序 */
  if (order !== undefined) {
    sqlContainer.push(`ORDER BY ${order[0]} ${order[1]}`);
  }

  if (limit !== undefined) {
    sqlContainer.push(`LIMIT ${limit}`);
  }

  return sqlContainer.join(' ');
};
