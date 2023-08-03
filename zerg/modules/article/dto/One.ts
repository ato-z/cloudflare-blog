import { Required } from '@ato-z/ioc/dto';
import { BaseDto } from '@zerg/dto';

export class ArticleOneDto extends BaseDto {
  @Required('文章id不能为空')
  id: string;
}
