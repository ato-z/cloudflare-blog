import type { Context } from './Context';

export type JobFnNext = () => unknown;
export type JobCurrent = (context: Context, next: JobFnNext) => unknown;

/**
 * 洋葱模型实现
 */
export class Queue {
  private readonly list: JobCurrent[] = [];

  push(handle: JobCurrent) {
    this.list.push(handle);
  }

  async up(ctx: Context) {
    const [...list] = this.list;
    const tigger = async (ctx: Context) => {
      const jobCurrent = list.shift();
      if (jobCurrent === undefined) {
        return undefined;
      }

      const result: unknown = await jobCurrent(ctx, async () => {
        const nextResult = await tigger(ctx);
        return nextResult;
      });

      return result;
    };

    const result = await tigger(ctx);
    return result;
  }
}
