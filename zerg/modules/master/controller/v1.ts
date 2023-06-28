import { POST, GET, Controller } from '@ato-z/ioc';
import { LoginDto } from '../dto/Login';
import { ServiceSign } from '@zerg/service/Sign';
import { ServiceToken } from '@zerg/service/Token';

@Controller('v1')
export class ControllerMasterV1 {
  /**
   * @api {post} /master/v1/login   管理员登录
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
   *    "sign": "string"
   * }
   */
  @POST('login') async login() {
    const post = new LoginDto();
    await post.check();
    const serviceSign = new ServiceSign();
    const sign = await serviceSign.getByLogin(post);
    return { sign };
  }

  /**
   * @api {get} /master/v1/token   获取临时token
   * @apiVersion 1.0.0
   * @apiName masterToken
   * @apiGroup master
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   sign 调用[管理员登录](#api-master-masterLogin)获取
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   *    "token": "string"
   * }
   */
  @GET('token') async token() {
    const serviceSign = new ServiceSign();
    const token = await serviceSign.createToken();
    return { token };
  }

  /**
   * @api {post} /master/v1/login   管理员登录获取凭证
   * @apiVersion 1.0.0
   * @apiName masterLogin
   * @apiGroup master
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   *
   * @apiSuccessExample {json} 成功响应:
   * {"id":1,"name":"superAdmin","nickname":"超级管理员","cover":0,"intro":"hi","password":"ea17ecdfdaaf9c0179367f9c436dac05bc9572f8","createDate":"2023-06-01"}
   */
  @GET('data') async data() {
    const master = await ServiceToken.instance.getCurrent();
    return master;
  }
}
