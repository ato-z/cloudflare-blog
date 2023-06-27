import { ExceptionParam } from './base';

export class ExceptionMissMaster extends ExceptionParam {
  override errorCode = 2000;
  override status = 400;
  override message = '当前账号不存在';
}
