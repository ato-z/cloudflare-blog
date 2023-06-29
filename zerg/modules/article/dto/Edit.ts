import { IsDate, IsInt, Length, Required } from '@ato-z/ioc/dto';
import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { BaseDto } from '@zerg/dto';

/**
 * 更新文章
 */
export class ArticleEditDto extends BaseDto {
  @IsInt()
  @Required()
  id: number;

  @Length(2, 64)
  @Required('标题不能为空')
  @IsLoose
  title?: string;

  @Length(2, 12)
  @Required('短标题不能为空')
  @IsLoose
  subTitle?: string;

  @Required('简介不能为空')
  @IsLoose
  intro?: string;

  @Required('标签不能为空')
  @IsLoose
  tags?: string;

  @Required('内容不能为空')
  @IsLoose
  content?: string;

  @IsInt()
  @Required('请上传封面')
  @IsLoose
  cover?: number;

  @IsDate()
  @IsLoose
  pubDate?: string;
}
