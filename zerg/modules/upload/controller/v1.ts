import { type Context, POST, Controller } from '@ato-z/ioc';
import { ServiceUploadImage } from '@zerg/service/UploadImage';
import { ImgBase64Dto } from '../dto/ImgBase64';

@Controller('v1')
export class ControllerUploadV1 {
  @POST('img/base64') async img(ctx: Context) {
    const post = new ImgBase64Dto();
    await post.check();
    const serviceUpload = new ServiceUploadImage();
    const result = await serviceUpload.byBase64(post);
    return result;
  }
}
