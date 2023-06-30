import { IsInt, Length, Required } from '@ato-z/ioc/dto';
import { BaseDto } from '@zerg/dto';

/**
 * 编辑小记
 */
export class NoteEditDto extends BaseDto {
  @IsInt()
  @Required()
  id: number;

  @Length(2, 64)
  @Required('标题不能为空')
  title: string;

  @Required('标签不能为空')
  tags: string;

  @Required('内容不能为空')
  content: string;
}
