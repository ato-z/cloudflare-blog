import type { Context } from '@ato-z/ioc';
import { ServiceToken } from '@zerg/service/Token';

/** token校验中间件 */
const reg = new RegExp(
  ['\\/master\\/v\\d+\\/token', '\\/master\\/v\\d+\\/login']
    .map(s => `(${s})`)
    .join('|'),
);
export const middlewareToken = async (
  ctx: Context,
  next: (ctx: Context) => unknown,
) => {
  const { url } = ctx;
  if (!reg.test(url)) {
    await ServiceToken.instance.checkCurrent();
  }

  const result = await next(ctx);
  return result;
};
