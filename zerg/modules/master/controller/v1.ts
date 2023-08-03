import { POST, GET, Controller, PATCH } from '@ato-z/ioc';
import { LoginDto } from '../dto/Login';
import { ServiceSign } from '@zerg/service/Sign';
import { ServiceToken } from '@zerg/service/Token';
import { ServiceMaster } from '../service/Master';
import { MasterEditDto } from '../dto/Edit';
import { MasterRePasswordDto } from '../dto/RePassword';

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
   * @api {get} /master/v1/data   管理员信息
   * @apiVersion 1.0.0
   * @apiName masterData
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
    const tokenData = await ServiceToken.instance.getCurrent();
    const master = await new ServiceMaster().one(tokenData.id);
    const entries = Object.entries(master).filter(
      ([key]) => key !== 'password',
    );
    const data = Object.fromEntries(entries);
    return data;
  }

  /**
   * @api {PATCH} /master/v1/edit   编辑管理员信息
   * @apiVersion 1.0.0
   * @apiName masterEdit
   * @apiGroup master
   *
   * @apiHeader {String}   Content-Type application/json
   *
   * @apiBody {String} nickname   用户名称
   * @apiBody {String} intro      简介
   * @apiBody {Number} cover      封面id
   *
   */
  @PATCH('edit') async edit() {
    const post = new MasterEditDto();
    await post.check();
    const master = await ServiceToken.instance.getCurrent();
    const serviceMaster = new ServiceMaster();
    await serviceMaster.edit(post, master.id);
    return { msg: 'ok' };
  }

  /**
   * @api {PATCH} /master/v1/repass   修改密码
   * @apiVersion 1.0.0
   * @apiName masterRePass
   * @apiGroup master
   *
   * @apiHeader {String}   Content-Type application/json
   *
   * @apiBody {String} password   密码
   * @apiBody {String} oldPassword   密码
   * @apiBody {String} rePassword   确认密码
   */
  @PATCH('repass') async repass() {
    const post = new MasterRePasswordDto();
    await post.check();
    const master = await ServiceToken.instance.getCurrent();
    const serviceMaster = new ServiceMaster();
    await serviceMaster.rePass(post, master);
    return { msg: 'ok' };
  }
}
