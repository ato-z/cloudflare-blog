import { Result } from '@ato-z/ioc';

/** 基础的异常类 */
export class BaseException extends Error {
  status = 500;
  errorCode = 999;
  data: unknown = null;

  constructor(message = 'Service Exception') {
    super(message);
  }

  toJson() {
    const response = {
      message: this.message,
      errorCode: this.errorCode,
      data: this.data,
    };
    return response;
  }

  toResponse() {
    const data = this.toJson();
    const result = new Result(data, this.status);
    const response = result.response();
    return response;
  }
}

/**
 * 参数异常
 */
export class ExceptionParam extends BaseException {
  override status = 400;
  override errorCode = 1000;
  constructor(public override message: string = '参数异常') {
    super(message);
  }
}
