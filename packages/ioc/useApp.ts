import type { Context } from './server/Context';
import { Dto } from './dto';

/**
 * 每次请求时触发的钩子
 */
export const useApp = async (ctx: Context) => {
  // 注入dto参数
  const post = await ctx.getBody();
  const parmas = ctx.params;
  Object.assign(Dto.params, { ...parmas, ...post });
};
