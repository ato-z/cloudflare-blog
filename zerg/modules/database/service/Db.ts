import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import { appConfig } from '@zerg/config/app';
import { TablePageDto } from '../dto/TablePage';
import { ServicePage } from '@zerg/service/Page';
import { ModelAny } from '@zerg/model/Any';
import { TableEditDto } from '../dto/TableEdit';
import { TableRemoveDto } from '../dto/TableRemove';

const { database } = appConfig;

export class ServiceDb extends WranglerEnv {
  get db() {
    const { env } = this;
    return <D1Database>env[database.dbname];
  }

  /**
   * 返回当前所有表
   */
  async getTables() {
    const { db } = this;
    const sql = `select name from sqlite_master where name LIKE '${database.tablePrefix}%' order by name;`;

    const stmt = db.prepare(sql);
    const { results } = await stmt.all();

    return results;
  }

  /**
   * 下载当前数据库
   */
  async dump() {
    const { db } = this;
    const dump = await db.dump();
    const filename = `${database.dbname}-${Date.now()}.sqlite3`;
    return new Response(dump, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment;filename=' + filename,
      },
    });
  }

  /**
   * 返回该表的数据列表
   */
  async list(tablePageParma: TablePageDto) {
    const model = new ModelAny(tablePageParma.tableName);
    const servicePage = new ServicePage<any>(model, {});

    return servicePage.list(tablePageParma, ['*']);
  }

  /**
   * 编辑表数据
   */
  async edit({ id, data, tableName }: TableEditDto) {
    const model = new ModelAny(tableName);
    await model.update(data, { where: { and: { id } } });
  }

  /**
   * 删除表数据
   */
  async remove({ id, tableName }: TableRemoveDto) {
    const model = new ModelAny(tableName);
    await model.remove({
      where: { and: { id } },
    });
  }
}
