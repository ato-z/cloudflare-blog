import { touchValidate } from './touchValidate';

const isInt = (value: unknown, msg?: string) => {
  const type = typeof value;
  const postMsg = msg ?? '不是一个整型数字';
  if (type === 'number' || type === 'string') {
    if (parseInt(<string>value) != value) {
      throw new TypeError(postMsg);
    }
  } else {
    throw new TypeError(postMsg);
  }
};

/**
 * 判断是否为整型数字|字符串
 */
export const IsInt = (msg?: string) => (target: any, propName: string) => {
  const validates = touchValidate(target);
  validates.push([propName, value => isInt(value, msg)]);
};
