import type { Context } from './Context';

export class WranglerEnv {
  static ctx: Context;

  get env() {
    return WranglerEnv.ctx.env;
  }

  get ctx() {
    return WranglerEnv.ctx;
  }
}
