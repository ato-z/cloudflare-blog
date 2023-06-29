export * from './length';
export * from './required';
export * from './isBase64';
export * from './isInt';
export * from './isDate';

type PropName = string;
type CheckHandle = (...args: any[]) => any;
type Validate = [PropName, CheckHandle];

const ruleName = '__dto@rule';

export const touchStore = <T extends Record<string | symbol, unknown>>(
  target: T,
): Validate[] => {
  const store = Reflect.get(target, ruleName) as Validate[];
  if (store === undefined) {
    Object.defineProperty(target, ruleName, {
      value: [],
      enumerable: false,
      writable: false,
    });

    return touchStore(target);
  }

  return store;
};
