/**
 * 断言函数，判断是否为请求响应错误
 * @param value
 * @returns
 */
export const isResponseError = (
  value: unknown,
): value is {
  errorCode: number;
  message: string;
  data: unknown;
  status: number;
  code: string;
  method: string;
  url: string;
} => {
  if (!value) return false;

  return Reflect.has(value, 'errorCode') && Reflect.has(value, 'message');
};
