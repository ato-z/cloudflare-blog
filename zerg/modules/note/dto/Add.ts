import { IsDate, IsInt, Length, Required } from '@ato-z/ioc/dto';
import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { BaseDto } from '@zerg/dto';

/**
 * 新增小记
 */
export class NoteAddDto extends BaseDto {
  @Length(2, 64)
  @Required('标题不能为空')
  title: string;

  @Required('标签不能为空')
  tags: string;

  @Required('内容不能为空')
  content: string;
}
