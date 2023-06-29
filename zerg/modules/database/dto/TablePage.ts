import { Required } from '@ato-z/ioc/dto';
import { PageParamDto } from '@zerg/dto';

export class TablePageDto extends PageParamDto {
  @Required('表名不能为空')
  tableName: string;
}
