import { Dto, IsInt } from '@ato-z/ioc/dto';
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

/**
 * 分页参数
 */
export class PageParamDto extends BaseDto {
  @IsInt()
  start: number = 0;

  @IsInt()
  end: number = 15;
}
