import { touchValidate } from './touchValidate';

const isBase64 = (
  value: unknown,
  op: { fileType?: string[]; msg?: string },
) => {
  if (typeof value !== 'string') {
    return false;
  }

  const { fileType } = op;
  const [data, base64] = value.split(',');
  if (!data || !base64) {
    throw new TypeError('不是一个base64数据');
  }

  if (fileType && new RegExp(fileType.join('|')).test(data) === false) {
    throw new TypeError(`文件格式不符合需求${fileType.join('|')}`);
  }
};

export const IsBase64 =
  (op: { fileType?: string[]; msg?: string }) =>
  (target: any, propName: string) => {
    const validates = touchValidate(target);
    validates.push([propName, value => isBase64(value, op)]);
  };
