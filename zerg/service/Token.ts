import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import {
  ExceptionMissToken,
  ExceptionTrespassToken,
} from '@zerg/exception/accredit';
import { TmpKv } from './TmpKv';
import { Master } from '@zerg/model/Master';

type TokenData = { master: Master; ip: string };

export class ServiceToken extends WranglerEnv {
  static instance = new ServiceToken();

  private readonly tokenMap = new Map<string, TokenData>();

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

  /** 当前访问者token */
  get token() {
    const { ctx } = this;
    const token = ctx.headers.get('token');
    if (token === null) {
      throw new ExceptionMissToken();
    }

    return token;
  }

  /**
   * 传入token字符串返回token信息
   */
  private async getTokenData(token: string) {
    const { tokenMap, tmpKv } = this;
    if (tokenMap.has(token)) {
      return tokenMap.get(token)!;
    }

    const kvData = await tmpKv.get<TokenData>(`token:${token}`);
    if (kvData === null) {
      throw new ExceptionMissToken();
    }

    tokenMap.set(token, kvData);
    return kvData;
  }

  /**
   * 校验当前token的合法性
   */
  async checkCurrent() {
    const { token, currentIp } = this;
    const tokenData = await this.getTokenData(token);
    if (currentIp !== tokenData.ip) {
      throw new ExceptionTrespassToken();
    }
  }

  /**
   * 获取当前用户登录信息
   */
  async getCurrent() {
    const { token } = this;
    const { master } = await this.getTokenData(token);
    return master;
  }
}
