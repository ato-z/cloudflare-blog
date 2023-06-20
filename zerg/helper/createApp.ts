import { App, type Module } from '@ato-z/ioc';
import { useMiddleware } from '@zerg/middleware';

export const createApp = (...modules: Array<Module<new () => unknown>>) => {
  const app = new App();
  // 添加中间件
  useMiddleware(app);

  // 导入模型列表
  modules.forEach(m => {
    app.use(m.install());
  });

  return app.to;
};
