import { Controller, GET } from '@ato-z/ioc';
import { PageParamDto } from '@zerg/dto';
import { ServiceException } from '../service/Exception';

@Controller('v1')
export class ControllerExceptionV1 {
  /**
   * @api {get} /exception/v1/list   异常列表
   * @apiVersion 1.0.0
   * @apiName exceptionList
   * @apiGroup exception
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiParam {String} [start=0]      跳过条目
   * @apiParam {String} [end=15]       获取条目
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   *    "total": 6,
   *    "list": [
   *    ]
   * }
   */
  @GET('list') async list() {
    const pageParam = new PageParamDto();
    await pageParam.check();
    const service = new ServiceException();
    return service.list(pageParam);
  }
}
