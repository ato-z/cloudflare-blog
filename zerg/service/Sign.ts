import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import { appConfig } from '@zerg/config/app';
import { ExceptionParam } from '@zerg/exception';
import { ExceptionMissMaster } from '@zerg/exception/accredit';
import { ModelMaster, type Master } from '@zerg/model/Master';
import { LoginDto } from '@zerg/modules/master/dto/Login';
import sha1 from 'sha1';
import { TmpKv } from './TmpKv';

const { hash } = appConfig;
export class ServiceSign extends WranglerEnv {
  protected modelMaster = new ModelMaster();

  /**
   * 加密明文密码
   */
  static codePassword(name: string, pass: string) {
    return sha1(`${hash}${name}${pass}`);
  }

  /**
   * 检查管理员的合法性
   */
  private checkLogin(master: Master, post: LoginDto) {
    const codePassword = ServiceSign.codePassword(post.user, post.password);
    if (master.password !== codePassword) {
      throw new ExceptionParam('密码有误');
    }

    if (typeof master.deleteDate === 'string') {
      throw new ExceptionMissMaster('该账户已被封禁');
    }
  }

  /**
   * 根据管理员账号生成sign
   */
  private async createSignByMaster(master: Master, ip: string) {
    const content = { master, ip };
    const sign = sha1(`${Date.now()}${hash}${master.name}`);
    const tmp = TmpKv.instance();
    await tmp.put(sign, content);

    return sign;
  }

  /**
   * 传入用户名查询管理员
   */
  async getMasterByName(name: string) {
    const { modelMaster } = this;
    const list = await modelMaster.select({ where: { and: { name } } });
    const { first } = list;
    if (first === null) {
      throw new ExceptionMissMaster();
    }

    return first;
  }

  /**
   * 登录并返回sign
   */
  async getByLogin(post: LoginDto) {
    const { ctx } = this;
    const master = await this.getMasterByName(post.user);
    this.checkLogin(master, post);
    const ip = ctx.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    const sign = this.createSignByMaster(master, ip);
    return sign;
  }
}
