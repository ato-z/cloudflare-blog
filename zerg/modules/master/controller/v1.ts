import { type Context, POST, GET, Controller } from '@ato-z/ioc';
import { LoginDto } from '../dto/Login';
import { ModelMaster } from '@zerg/model/Master';
import { ServiceSign } from '@zerg/service/Sign';

@Controller('v1')
export class ControllerMasterV1 {
  @POST('login') async login(ctx: Context) {
    const post = new LoginDto();
    await post.check();
    const serviceSign = new ServiceSign();
    const sign = await serviceSign.getByLogin(post);
    return { sign };
  }

  @GET('data') data() {
    return 'data';
  }

  @GET('test') async test() {
    const master = new ModelMaster();
    const result = await master.find(1);
    return result;
  }
}
