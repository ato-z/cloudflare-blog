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
  @IsLoose
  title?: string;

  @Length(2, 12)
  @IsLoose
  subTitle?: string;

  @IsLoose
  intro?: string;

  @IsLoose
  tags?: string;

  @IsLoose
  content?: string;

  @IsInt()
  @IsLoose
  cover?: number;

  @IsDate()
  @IsLoose
  pubDate?: string;

  @IsInt()
  @IsLoose
  status?: number;
}
