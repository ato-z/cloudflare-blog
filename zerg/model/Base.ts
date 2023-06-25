import {
  DeleteOption,
  Insert,
  Model,
  Select,
  SelectOption,
  Update,
  UpdateOption,
  _Delete,
} from '@ato-z/orm';
import { appConfig } from '@zerg/config/app';
import { ServiceResultList, Appending } from '@zerg/service/ResultList';
export * from '@zerg/service/ResultList';

const { tablePrefix, dbname } = appConfig.database;
export abstract class ModelBase<T> extends Model {
  // 表前缀
  tablePrefix = tablePrefix;
  // 主键
  readonly primaryKey = 'id';
  // 获取器操作
  abstract getting;
  // 隐藏字段
  abstract hideing;
  // 可见字段
  abstract appending: Appending<T>;
  /** 表名 */
  abstract name: string;

  /** 连接数据库 */
  get db() {
    const { env } = this;
    const db = Reflect.get(env, dbname) as D1Database;
    return db;
  }

  /**
   * 查询并返回一组数据
   */
  async select<R extends T, I extends this>(option: SelectOption<T>) {
    const { tableName, getting, hideing, appending } = this;
    const sql = Select(tableName, option);
    const list = await this.querySelect(sql);
    const codeList = new ServiceResultList(
      list as R[],
      getting as I['getting'],
      hideing as I['hideing'],
      appending as this['appending'],
    );
    return codeList;
  }

  /**
   * 传入主键查询单条数据
   */
  async find(id: string | number) {
    const { primaryKey } = this;
    const whereAnd: any = { [primaryKey]: id };
    const codeList = await this.select({
      where: { and: whereAnd },
      limit: 1,
    });

    if (codeList.list.length === 0) {
      return null;
    }

    const [first] = await codeList.toJSON();
    return first;
  }

  /**
   * 新增单个
   */
  async insert(
    post: Omit<T, this['primaryKey']> | Omit<T, this['primaryKey']>[],
  ) {
    const { tableName } = this;
    const sql = Insert<any>(tableName, post);
    const result = await this.run(sql);
    return result;
  }

  /**
   * 更新数据
   */
  async update(post: Partial<T>, option: UpdateOption<T>) {
    const { tableName } = this;
    const sql = Update<any>(tableName, post, option);
    const result = await this.run(sql);
    return result;
  }

  /**
   * 删除数据
   */
  async remove(option: DeleteOption<T>) {
    const { tableName } = this;
    const sql = _Delete<any>(tableName, option);
    const result = await this.run(sql);
    return result;
  }
}
