import { Select } from '@ato-z/orm';
import { PageParamDto } from '@zerg/dto';
import { ModelBase } from '@zerg/model/Base';

type SelectOption<F> = F extends (op: { where: infer P }) => any ? P : any;
/**
 * 文章&小计的标签
 */
export class ServicePage<T> {
  constructor(
    protected readonly model: ModelBase<T>,
    protected readonly where: SelectOption<ModelBase<T>>,
  ) {}

  async list(
    pageParam: PageParamDto,
    field: Array<keyof T & string> = [<keyof T & string>'*'],
  ) {
    const { model, where } = this;
    const { start, end } = pageParam;
    const codeList = await model.select({
      where,
      field: field.join(','),
      limit: [start, end],
      order: [<keyof T & string>model.primaryKey, 'DESC'],
    });
    const list = await codeList.toJSON();
    const sql = Select(model.tableName, { where, field: 'COUNT(*) AS total' });
    const stmt = model.db.prepare(sql);
    const total = await stmt.first('total');

    return { total, list };
  }
}
