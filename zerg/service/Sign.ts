import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import { appConfig } from '@zerg/config/app';
import { ExceptionParam } from '@zerg/exception';
import {
  ExceptionMissMaster,
  ExceptionMissSign,
  ExceptionTrespassSign,
} from '@zerg/exception/accredit';
import { ModelMaster, type Master } from '@zerg/model/Master';
import { LoginDto } from '@zerg/modules/master/dto/Login';
import sha1 from 'sha1';
import { TmpKv } from './TmpKv';

const { hash, expTime } = appConfig;
export class ServiceSign extends WranglerEnv {
  protected modelMaster = new ModelMaster();

  /**
   * 加密明文密码
   */
  static codePassword(name: string, pass: string) {
    return sha1(`${hash}${name}${pass}`);
  }

  /** 当前访问者的ip */
  get currentIp() {
    const { ctx } = this;
    const ip = ctx.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    return ip;
  }

  /** 用户储存临时数据的kv地址 */
  get tmpKv() {
    return TmpKv.instance();
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
    const { tmpKv } = this;
    await tmpKv.put(`sign:${sign}`, content, { expirationTtl: expTime.sign });

    return sign;
  }

  /**
   * 传入用户名查询管理员
   */
  private async getMasterByName(name: string) {
    const { modelMaster } = this;
    const list = await modelMaster.select({ where: { and: { name } } });
    const { first } = list;
    if (first === null) {
      throw new ExceptionMissMaster();
    }

    return first;
  }

  /**
   * 校验 sign 是否合法
   */
  private async checkSign(sign: string | null) {
    if (sign === null) {
      throw new ExceptionMissSign();
    }

    const { tmpKv, currentIp } = this;
    const result = await tmpKv.get<{ master: Master; ip: string }>(
      `sign:${sign}`,
    );
    if (result === null) {
      throw new ExceptionMissSign();
    }

    if (currentIp !== result.ip) {
      throw new ExceptionTrespassSign();
    }

    return result;
  }

  /**
   * 登录并返回sign
   */
  async getByLogin(post: LoginDto) {
    const { currentIp } = this;
    const master = await this.getMasterByName(post.user);
    this.checkLogin(master, post);
    const sign = this.createSignByMaster(master, currentIp);
    return sign;
  }

  /**
   * 传入sign返回一个短时效的token
   */
  async createToken() {
    const { headers } = this.ctx;

    const sign = headers.get('sign');
    const signData = await this.checkSign(sign);

    const token = sha1(`${signData.master.name}${hash}${Date.now()}`);
    const master = await this.modelMaster.find(signData.master.id);
    await this.tmpKv.put(
      `token:${token}`,
      { master, ip: signData.ip },
      { expirationTtl: expTime.token },
    );

    return token;
  }
}
