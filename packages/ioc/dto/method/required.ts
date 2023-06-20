/* eslint-disable @typescript-eslint/naming-convention */
import { touchValidate } from './touchValidate';

/**
 * 不为空
 * @param value
 */
const required = (value: unknown, msg = '不能为空') => {
  if (value === undefined || value === null || value === '') {
    throw new TypeError(msg);
  }

  if (typeof value === 'string') {
    const spaceString = value.trimStart().trimEnd();
    if (spaceString.length === 0) {
      throw new TypeError(msg);
    }
  }

  return true;
};

export const Required = (msg?: string) => (target: any, propName: string) => {
  const validates = touchValidate(target);
  validates.push([propName, value => required(value, msg)]);
};
