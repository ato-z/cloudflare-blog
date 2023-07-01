import { getCurrentDate, date } from '@ato-z/helper';
import { Context } from '@ato-z/ioc';
import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import { ModelException } from '@zerg/model/Exception';

const model = new ModelException();
export class ServiceLog {
  static async add(err: Error, ctx: Context) {
    try {
      const { message, stack } = err;
      const createDate = date('y/m/d h:i:s', getCurrentDate());
      const { method, url, params, header, body } = await this.getPropByCtx(
        ctx,
      );
      const row = {
        message,
        stack,
        createDate,
        method,
        url,
        body: JSON.stringify(body),
        header: JSON.stringify(header),
        params: JSON.stringify(params),
      };
      await model.insert(row);
    } catch {}
  }

  static async getPropByCtx(ctx: Context) {
    const header = {};
    const headerEntrie = ctx.headers.entries();
    for (const [key, value] of headerEntrie) {
      header[key] = value;
    }
    let body = await ctx.getBody();
    const { url, method, params } = ctx;

    if (body instanceof FormData) {
      const bodyEntrie = body.entries();
      body = {};
      for (const [key, value] of bodyEntrie) {
        body[key] = value;
      }
    }

    return { header, body, url, method, params };
  }
}
