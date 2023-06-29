import { Required } from '@ato-z/ioc/dto';
import { BaseDto } from '@zerg/dto';

export class TableEditDto extends BaseDto {
  @Required('表名不能为空')
  tableName: string;

  @Required('id 主键不能为空')
  id: string;

  @Required()
  data: any;
}
