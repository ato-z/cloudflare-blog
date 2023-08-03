import { withMapProxy } from './withMapProxy';

type PropName = string;
type CheckHandle = (value: unknown) => any;
export type Validate = [PropName, CheckHandle];

const ruleName = '__dto@rule';

export const touchValidate = (target: any): Validate[] => {
  const proxy = withMapProxy(target.constructor);
  const store = Reflect.get(proxy, ruleName) as Validate[];
  if (store === undefined) {
    Object.defineProperty(proxy, ruleName, {
      value: [],
      enumerable: false,
      writable: false,
    });

    return touchValidate(target);
  }

  return store;
};
