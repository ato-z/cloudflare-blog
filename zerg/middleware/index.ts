/**
 * 导入中间件入口
 */
import type { App } from '@ato-z/ioc';
import { middlewareException } from './exception';

export const useMiddleware = (app: App) => {
  console.log('🐒 载入中间件...');
  app.use(middlewareException);
  console.log('🐒🔚🔚🔚🐒');
};
