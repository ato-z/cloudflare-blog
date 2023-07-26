type Class = new () => any;
const store = new Map<Class, Record<string, any>>();

/**
 * 获取代理仓库
 */
export const withMapProxy = (target: Class) => {
  if (!store.has(target)) {
    store.set(target, {});
  }

  return store.get(target)!;
};
