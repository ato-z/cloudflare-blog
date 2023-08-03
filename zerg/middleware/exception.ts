import {
  BaseException,
  ExceptionParam,
  ExceptionUnknown,
} from '@zerg/exception';
import type { Context } from '@ato-z/ioc';
import { ServiceLog } from '@zerg/service/Log';

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
    } else if (err instanceof TypeError) {
      const serviceError = new ExceptionParam(err.message);
      return serviceError.toResponse();
    } else if (err instanceof Error) {
      await ServiceLog.add(err, ctx);
      const serviceError = new ExceptionUnknown(err.message);
      return serviceError.toResponse();
    }
  }

  const serviceError = new ExceptionUnknown();
  return serviceError.toResponse();
};
