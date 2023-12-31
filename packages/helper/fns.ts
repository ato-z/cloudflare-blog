import { isNumber, toNumber } from './withType';

/**
 * 返回當前東8區的時間對象
 * ```typescript
 * const date: Date = getCurrentDate()
 * ```
 */
export const getCurrentDate = () => {
  const now = Date.now() + 8 * 3600000;
  const date = new Date(now);
  return date;
};

/**
 * 字符串轉對象
 * ```typescript
 * const input = 'a=1&b2'
 * const out = partParams<{ a: '1', b: '2' }>('a=1&b2')
 * ```
 */
export const partParams = <T>(param?: string): T => {
  if (param === undefined) {
    return {} as unknown as T;
  }

  const lis = param.split('&').map(item => item.split('='));
  return Object.fromEntries(lis) as T;
};

/**
 * 解码路由
 * ```typescript
 * const url = 'https://example.com/v1/foo?a=1&b2'
 * const result = partRouter<{ a: '1', b: '2' }>(url)
 * ```
 */
export const partRouter = <T>(
  router: string,
): { url: string; domain: string; params: T } => {
  const [url, parmas] = router.split('?') as [string, undefined];
  const path = url.split(/\/|\\/);
  const domain: string = path.splice(0, 3).join('/');

  return {
    url: `/${path.join('/')}`,
    domain,
    params: partParams<T>(parmas),
  };
};

/**
 * 个位数填充0
 * @param {number} n 需要检验的字符
 * @returns 转化后的字符
 * ```
 * fillZero(1) // => 01
 * fillZero(10) // => 10
 * ```
 */
export const fillZero = (n: number) => {
  const codeN = n.toString();
  if (codeN.length > 1) {
    return codeN;
  }

  return `0${codeN}`;
};

/**
 * 特定格式时间字符串转实际时间
 * @param {string} dateString 需要格式的字符串，如: Y年m月d日 h时m分s秒
 * @param {Date}   _date        new Date()
 * @returns 格式化后的字符串: y-m-d H:i:s => 2022-02-02 10:00:00
 * ```
 * const datatime = date('Y年m月d日 h时m分s秒', new Date()) // => 2021年01月05日 10时10分10秒
 * ```
 */
export const date = function (dateString: string, _date?: Date): string {
  const reg = /[y|m|d|h|i|s]/gi;
  const date = _date ?? new Date(getCurrentDate());
  dateString = dateString.replace(reg, (val): string => {
    val = val.toUpperCase();
    switch (val) {
      case 'Y':
        return date.getFullYear().toString();
      case 'M':
        return fillZero(date.getMonth() + 1);
      case 'D':
        return fillZero(date.getDate());
      case 'H':
        return fillZero(date.getHours());
      case 'I':
        return fillZero(date.getMinutes());
      case 'S':
        return fillZero(date.getSeconds());

      default:
        return '';
    }
  });
  return dateString;
};

/**
 * 断言函数，如果具有length则为字符串或者数组
 */
export const withLength = <T extends { length: number } & string>(
  target: any,
): target is T => {
  try {
    if (typeof target === 'string') {
      return true;
    }

    const length: unknown = Reflect.get(target, 'length');
    return typeof length === 'number';
  } catch {
    return false;
  }
};
