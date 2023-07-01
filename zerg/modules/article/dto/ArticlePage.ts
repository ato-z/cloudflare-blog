import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { PageParamDto } from '@zerg/dto';

export class ArticlePageDto extends PageParamDto {
  @IsLoose
  title?: string;

  @IsLoose
  tags?: string;
}
