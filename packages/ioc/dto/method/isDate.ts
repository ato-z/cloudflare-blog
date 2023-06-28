import { touchValidate } from './touchValidate';

const isDate = (value: unknown, msg?: string) => {
  console.log(value);
  if (isNaN(new Date(<string>value).getTime())) {
    throw new TypeError(msg ?? '不是一个时间戳或符合时间格式字符串');
  }
};

/**
 * 判断是否为时间字符串
 */
export const IsDate = (msg?: string) => (target: any, propName: string) => {
  const validates = touchValidate(target);
  validates.push([propName, value => isDate(value, msg)]);
};
