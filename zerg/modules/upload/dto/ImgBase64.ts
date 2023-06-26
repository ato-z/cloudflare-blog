import { Dto, IsBase64, Required } from '@ato-z/ioc/dto';

export class ImgBase64Dto extends Dto {
  @IsBase64({ fileType: ['png', 'jpg'] })
  @Required()
  img: string;

  @Required()
  width: number;

  @Required()
  height: number;

  @Required()
  color: string;

  @IsBase64({ fileType: ['png', 'jpg'] })
  thumb?: string;
}
