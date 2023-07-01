import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { PageParamDto } from '@zerg/dto';

export class PasserbyIpPageDto extends PageParamDto {
  @IsLoose
  ip?: string;

  @IsLoose
  total?: string;

  @IsLoose
  from?: string;
}
