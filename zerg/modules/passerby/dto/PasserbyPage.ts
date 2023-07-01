import { IsLoose } from '@ato-z/ioc/dto/method/isLoose';
import { PageParamDto } from '@zerg/dto';

export class PasserbyPageDto extends PageParamDto {
  @IsLoose
  lastIp?: string;

  @IsLoose
  nickname?: string;

  @IsLoose
  email?: string;
}
