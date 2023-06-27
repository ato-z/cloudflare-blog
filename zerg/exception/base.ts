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

/**
 * 成功的响应
 */
export class ExceptionSuccess extends BaseException {
  public override errorCode = 0;
  constructor(
    public override message: string = 'ok',
    public override data: unknown = null,
  ) {
    super(message);
  }
}

/**
 * 未知异常
 */
export class ExceptionUnknown extends BaseException {
  constructor(
    public override message: string = '网络异常',
    public override data: unknown = null,
  ) {
    super(message);
  }
}
