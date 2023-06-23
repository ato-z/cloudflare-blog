import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';

export abstract class Model extends WranglerEnv {
  // 主键
  abstract primaryKey: string;
  // 表前缀
  abstract tablePrefix: string;
  /** 表名 */
  abstract name: string;
  /** 链接的数据库 */
  abstract db: D1Database;

  /** 表名<带表前缀> */
  get tableName() {
    const { name, tablePrefix } = this;
    return `${tablePrefix}${name}`.replace(/[A-Z][a-z]/g, em =>
      `_${em}`.toLowerCase(),
    );
  }

  /** 从第一行获取特定列 */
  protected async first(sql: string, column: string) {
    const { db } = this;
    const stmt = db.prepare(sql);
    const result = await stmt.first(column);
    return result;
  }

  /** 查询返回一组结果 */
  protected async querySelect(sql: string): Promise<unknown[]> {
    const { db } = this;
    const stmt = db.prepare(sql);
    const { results } = await stmt.all();

    if (results === undefined) {
      return [];
    }

    return results;
  }

  /** 执行返回影响行数 */
  protected async run(sql: string) {
    const { db } = this;
    const info = await db.prepare(sql).run();

    return info;
  }

  /** 执行原生sql */
  protected async exec(sql: string) {
    const { db } = this;
    const result = await db.exec(sql);
    return result;
  }
}
