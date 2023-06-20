type PropName = string;
type CheckHandle = (value: unknown) => any;
export type Validate = [PropName, CheckHandle];

const ruleName = '__dto@rule';

export const touchValidate = (target: any): Validate[] => {
  const store = Reflect.get(target, ruleName) as Validate[];
  if (store === undefined) {
    Object.defineProperty(target, ruleName, {
      value: [],
      enumerable: false,
      writable: false,
    });

    return touchValidate(target);
  }

  return store;
};
