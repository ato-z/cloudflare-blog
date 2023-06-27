import { type Context, POST, GET, Controller } from '@ato-z/ioc';
import { LoginDto } from '../dto/Login';
import { ModelMaster } from '@zerg/model/Master';
import { ServiceSign } from '@zerg/service/Sign';

@Controller('v1')
export class ControllerMasterV1 {
  /**
   * @api {post} /master/v1/login   管理员登录获取凭证
   * @apiVersion 1.0.0
   * @apiName masterLogin
   * @apiGroup master
   *
   * @apiHeader {String}   Content-Type application/json
   *
   * @apiBody {String} user       账户名
   * @apiBody {String} password   密码
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   *    // 登录成功的凭证,放置到header中可换取临时token
   *    "sign": "string"
   * }
   */
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
