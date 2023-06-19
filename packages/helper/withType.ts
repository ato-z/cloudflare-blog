/**
 * 断言函数，判定输入是否为数字
 * @param input
 * @returns
 */
export const isNumber = (input: unknown): input is number => {
  const inputStr = Reflect.apply(Object.toString, input, []);
  return /^[\d|\\.]?\.?\d+$/.test(inputStr);
};

/** 转化为数字 */
export const toNumber = (val: any) => val / 1;
