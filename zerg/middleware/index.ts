/**
 * 导入中间件入口
 */
import type { App } from '@ato-z/ioc';

export const useMiddleware = (app: App) => {
  console.log('🐒 正在载入中间件...');
};
