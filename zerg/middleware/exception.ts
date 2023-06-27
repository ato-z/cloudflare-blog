import { BaseException, ExceptionUnknown } from '@zerg/exception';
import type { Context } from '@ato-z/ioc';

/** 异常中间件 */
export const middlewareException = async (
  ctx: Context,
  next: (ctx: Context) => unknown,
) => {
  try {
    const result = await next(ctx);
    return result;
  } catch (err: unknown) {
    if (err instanceof BaseException) {
      return err.toResponse();
    }
  }

  const serviceError = new ExceptionUnknown();
  return serviceError.toResponse();
};
