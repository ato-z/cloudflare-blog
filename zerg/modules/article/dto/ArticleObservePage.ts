import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { PageParamDto } from '@zerg/dto';

export class ArticleObservePageDto extends PageParamDto {
  @IsLoose
  uid?: number;

  articleId?: number;
}
