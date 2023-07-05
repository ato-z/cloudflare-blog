import { Length, Required } from '@ato-z/ioc/dto';
import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { BaseDto } from '@zerg/dto';

export class MasterEditDto extends BaseDto {
  @Length(1, 12)
  @IsLoose
  nickname: string;

  intro?: string;

  cover?: number;
}
