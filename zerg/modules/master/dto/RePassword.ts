import { Length, Required } from '@ato-z/ioc/dto';
import { BaseDto } from '@zerg/dto';

export class MasterRePasswordDto extends BaseDto {
  @Length(6, 16)
  @Required('新密码不能为空')
  password: string;

  @Length(6, 16)
  @Required('旧密码不能为空')
  oldPassword: string;

  @Length(6, 16)
  @Required('确认密码不能为空')
  rePassword: string;
}
