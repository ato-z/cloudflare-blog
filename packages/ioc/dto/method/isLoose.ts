import { touchValidate } from './touchValidate';

export const jumpHandle = () => {};

/**
 * 当字段存在才进行校验
 */
export const IsLoose = (target: any, propName: string) => {
  const validates = touchValidate(target);
  validates.push([propName, jumpHandle]);
};
