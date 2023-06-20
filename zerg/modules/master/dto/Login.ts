import { Dto, Length } from '@ato-z/ioc/dto';

export class LoginDto extends Dto {
  @Length(4, 8)
  user: string;

  @Length(6, 16)
  password: string;
}
