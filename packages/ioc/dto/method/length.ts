/* eslint-disable @typescript-eslint/naming-convention */
import { withLength } from '@ato-z/helper';
import { touchValidate } from './touchValidate';

const length = (
  value: unknown,
  min: number,
  max?: number,
  msg = '并不具备可比较的长度属性',
) => {
  if (!withLength(value)) {
    return msg;
  }

  const { length } = value;
  if (length < min) {
    msg = `长度不能小于${min}`;
    throw new TypeError(msg);
  }

  if (max && length > max) {
    msg = `长度不能大于${max}`;
    throw new TypeError(msg);
  }
};

/**
 * 长度校验
 * @param min 最小长度
 * @param max 最大长度 [可选]
 */
export const Length: {
  (min: number, max: number, msg?: string): any;
  (min: number, msg?: string): any;
} =
  (...args: unknown[]) =>
  (target: any, propName: string) => {
    const validates = touchValidate(target);
    if (args.length === 1) {
      const [min] = args as [number];
      validates.push([propName, value => length(value, min)]);
    }

    if (args.length === 2) {
      let min: number;
      let max = 0;
      let msg: string;

      if (typeof args[1] === 'string') {
        [min, msg] = args as [number, string];
      } else {
        [min, max] = args as [number, number];
      }

      validates.push([propName, value => length(value, min, max, msg)]);
    }

    if (args.length === 3) {
      const [min, max, msg] = args as [number, number, string];
      validates.push([propName, value => length(value, min, max, msg)]);
    }
  };
