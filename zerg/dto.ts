import { Dto } from '@ato-z/ioc/dto';
import { ExceptionParam } from '@zerg/exception';

export class BaseDto extends Dto {
  async check(): Promise<void> {
    try {
      await super.check();
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ExceptionParam(err.message);
      }

      throw err;
    }
  }
}
