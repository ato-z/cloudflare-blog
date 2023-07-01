import { Controller, GET } from '@ato-z/ioc';
import { PasserbyPageDto } from '../dto/PasserbyPage';
import { ServicePasserby } from '../service/passerby';
import { PasserbyIpPageDto } from '../dto/PasserbyIpPage';

@Controller('v1')
export class ControllerPasserbyV1 {
  /**
   * @api {get} /passerby/v1/list   游客列表
   * @apiVersion 1.0.0
   * @apiName passerbyList
   * @apiGroup passerby
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiParam {String} [start=0]      跳过条目
   * @apiParam {String} [end=15]       获取条目
   * @apiParam {String} [lastIp]       最后登录ip
   * @apiParam {String} [nickname]     用户昵称(模糊查询)
   * @apiParam {String} [email]        邮箱(模糊查询)
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   *    "total": 6,
   *    "list": [
   *    ]
   * }
   */
  @GET('list') async list() {
    const pageParam = new PasserbyPageDto();
    await pageParam.check();
    const service = new ServicePasserby();
    return service.list(pageParam);
  }

  /**
   * @api {get} /passerby/v1/ips   访问ip列表
   * @apiVersion 1.0.0
   * @apiName passerbyIps
   * @apiGroup passerby
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiParam {String} [start=0]      跳过条目
   * @apiParam {String} [end=15]       获取条目
   * @apiParam {String} [from]         来自
   * @apiParam {String} [total]        访问次数
   * @apiParam {String} [ip]           访问ip
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   *    "total": 6,
   *    "list": [
   *    ]
   * }
   */
  @GET('ips') async ips() {
    const pageParam = new PasserbyIpPageDto();
    await pageParam.check();
    const service = new ServicePasserby();
    return service.ips(pageParam);
  }
}
