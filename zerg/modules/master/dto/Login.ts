import { Dto, Length, Required } from '@ato-z/ioc/dto';

export class LoginDto extends Dto {
  @Length(4, 12)
  @Required('用户名不能为空')
  user: string;

  @Length(6, 16)
  @Required('密码不能为空')
  password: string;
}
