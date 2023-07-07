import { IsDate, IsInt, Length, Required } from '@ato-z/ioc/dto';
import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { BaseDto } from '@zerg/dto';

/**
 * 新增文章
 */
export class ArticleAddDto extends BaseDto {
  /** 文章标题 */
  @Length(2, 64)
  @Required('标题不能为空')
  title: string;

  @Length(2, 12)
  @Required('短标题不能为空')
  subTitle: string;

  @Required('简介不能为空')
  @IsLoose
  intro: string;

  @Required('标签不能为空')
  tags: string;

  @Required('内容不能为空')
  content: string;

  @IsInt()
  @Required('请上传封面')
  @IsLoose
  cover: number;

  @IsInt()
  @IsLoose
  status?: number;

  @IsDate()
  @IsLoose
  pubDate?: string;
}
