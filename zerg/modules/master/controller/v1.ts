import { type Context, POST, GET, Controller } from '@ato-z/ioc';

@Controller('v1')
export class ControllerMasterV1 {
  @POST('login') login(ctx: Context) {
    return 'login post';
  }

  @GET('data') data() {
    return 'data';
  }
}
