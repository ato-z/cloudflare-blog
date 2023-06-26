import type { Context } from './server/Context';
import { Dto } from './dto';
import { WranglerEnv } from './server/WranglerEnv';

/**
 * 每次请求时触发的钩子
 */
export const useApp = async (ctx: Context) => {
  // 注入dto参数
  const post = await ctx.getBody();
  Dto.params = { ...ctx.params };
  if (post instanceof FormData) {
    const entries = post.entries();
    for (const item of entries) {
      Dto.params[item[0]] = item[1];
    }
  } else {
    Object.assign(Dto.params, { ...post });
  }

  WranglerEnv.ctx = ctx;
};
