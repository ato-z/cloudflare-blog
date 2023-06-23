/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * 查询条件where 运算符 的映射关系
 */
export const OP = {
  EQ: '=', // 等于
  NEQ: '<>', // 不等于
  GT: '>', // 大于
  EGT: '>=', // 大于等于
  LT: '<', // 小于
  ELT: '<=', // 小于等于
  LIKE: 'LIKE', // 模糊查询
  BETWEEN: 'BETWEEN', // 在区间中查询 [BETWEEN, [1,9]] => BETWEEN 1 AND 9
  NOT_BETWEEN: 'NOT BETWEEN', // 不在区间中查询 [NOT_BETWEEN, [1,9]] => NOT BETWEEN 1 AND 9
  IN: 'IN', // 数组in [IN, [1,3,6]] => IN (1, 3, 6)
  NOT_IN: 'NOT IN', // 同IN取反
} as const;

export type OP = typeof OP;
export type OPKeys = keyof {
  [P in keyof typeof OP as (typeof OP)[P]]: P;
};
