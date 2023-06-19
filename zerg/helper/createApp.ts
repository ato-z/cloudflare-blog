import { App, type Module } from '@ato-z/ioc';
import { useMiddleware } from '@zerg/middleware';

export const createApp = (...routers: Array<Module<new () => unknown>>) => {
  const app = new App();
  // 添加中间件
  useMiddleware(app);

  // 导入路由列表
  routers.forEach(router => {
    app.use(router.install());
  });

  return app.to;
};
