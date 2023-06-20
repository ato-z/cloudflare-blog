import { type Context, POST, GET, Controller } from '@ato-z/ioc';
import { LoginDto } from '../dto/Login';

@Controller('v1')
export class ControllerMasterV1 {
  @POST('login') async login(ctx: Context) {
    const post = new LoginDto();
    await post.check();
    console.log(post);
    return post;
  }

  @GET('data') data() {
    return 'data';
  }
}
