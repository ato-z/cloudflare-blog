import { ExceptionParam } from './base';

export class ExceptionMissMaster extends ExceptionParam {
  override errorCode = 2000;
  override status = 400;
  override message = '当前账号不存在';
}

export class ExceptionMissSign extends ExceptionParam {
  override errorCode = 3000;
  override status = 403;
  override message = 'unavailable sign';
}

export class ExceptionTrespassSign extends ExceptionParam {
  override errorCode = 3001;
  override status = 403;
  override message = 'sign of trespass';
}

export class ExceptionMissToken extends ExceptionParam {
  override errorCode = 4000;
  override status = 403;
  override message = 'unavailable token';
}

export class ExceptionTrespassToken extends ExceptionParam {
  override errorCode = 4001;
  override status = 403;
  override message = 'token of trespass';
}
