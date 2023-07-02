import { App, Context, Result, type Module } from '@ato-z/ioc';
import { appConfig } from '@zerg/config/app';
import { useMiddleware } from '@zerg/middleware';

const { site } = appConfig;

export const createApp = (...modules: Array<Module<new () => unknown>>) => {
  const app = new App();

  // 首页接口
  app.use((ctx: Context, next) => {
    if (ctx.url === '/') {
      return site;
    }

    return next();
  });

  // 添加中间件
  useMiddleware(app);

  // 导入模型列表
  modules.forEach(m => {
    app.use(m.install());
  });

  // 404路由
  app.use(({ url }: Context) => {
    return new Result({ msg: 'not found', url }, 404);
  });

  return app.to;
};
