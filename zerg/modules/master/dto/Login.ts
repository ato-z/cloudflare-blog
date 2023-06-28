import { Length, Required } from '@ato-z/ioc/dto';
import { BaseDto } from '@zerg/modules/Dto';

export class LoginDto extends BaseDto {
  @Length(4, 12)
  @Required('用户名不能为空')
  user: string;

  @Length(6, 16)
  @Required('密码不能为空')
  password: string;
}
