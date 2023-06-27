import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import { ExceptionMissToken } from '@zerg/exception/accredit';
import { TmpKv } from './TmpKv';
import { Master } from '@zerg/model/Master';

type TokenData = { master: Master; ip: string };

export class ServiceToken extends WranglerEnv {
  static instance = new ServiceToken();

  private readonly tokenMap = new Map<string, TokenData>();

  get tmpKv() {
    return TmpKv.instance();
  }

  get token() {
    const { ctx } = this;
    const token = ctx.headers.get('token');
    if (token === null) {
      throw new ExceptionMissToken();
    }

    return token;
  }

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
   * 获取当前用户登录信息
   */
  async getCurrent() {
    const { token } = this;
    const { master } = await this.getTokenData(token);
    return master;
  }
}
