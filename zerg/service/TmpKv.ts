import { KvStore } from '@ato-z/helper';
import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import { appConfig } from '@zerg/config/app';
const { expTime } = appConfig;
/**
 * 存放临时数据的kv
 */
let instance: TmpKv;
export class TmpKv extends WranglerEnv {
  static instance() {
    if (instance instanceof TmpKv === false) {
      instance = new TmpKv();
    }

    return instance;
  }
  get kv() {
    const { env } = this;
    const store = new KvStore(env.KV);
    return store;
  }

  async put(key: string, content: Record<string | number, unknown>) {
    const { kv } = this;
    await kv.push(key, content, { expirationTtl: expTime.sign });
  }

  async get<R extends Record<string, unknown>>(key: string) {
    const result = await this.kv.get(key);
    if (result) {
      return result.value as R;
    }

    return null;
  }
}
