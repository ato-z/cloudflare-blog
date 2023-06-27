/**
 * 导入中间件入口
 */
import type { App } from '@ato-z/ioc';
import { middlewareException } from './exception';
import { middlewareToken } from './token';

export const useMiddleware = (app: App) => {
  console.log('🐒 载入中间件...');
  app.use(middlewareException);
  app.use(middlewareToken);
  console.log('🐒🔚🔚🔚🐒');
};
