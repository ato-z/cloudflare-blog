type TableStructure = Record<string, 'INTEGER' | 'TEXT' | 'REAL' | 'BLOB'>;

/**
 * 建表语句
 * @param tableName 表名
 * @param structure 表结构
 * @param primaryKey 主键
 */
export const touchTable = <T extends TableStructure>(
  tableName: string,
  structure: T,
  primaryKey: keyof T,
) => {
  const porps: string[] = [];
  Object.keys(structure).forEach(porp => {
    const withPrimaryKey = porp === primaryKey ? ' PRIMARY KEY' : '';
    porps.push(`${porp} ${structure[porp]}${withPrimaryKey}`);
  });

  return `CREATE TABLE IF NOT EXISTS ${tableName} (${porps.join(', ')})`;
};
