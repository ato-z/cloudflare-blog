import { Required } from '@ato-z/ioc/dto';
import { PageParamDto } from '@zerg/dto';

export class ArticleOneDto extends PageParamDto {
  @Required('文章id不能为空')
  id: string;
}
