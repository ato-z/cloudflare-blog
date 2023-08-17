export const filterSqlVal = (val: unknown, key: string) => {
  if (val === undefined) {
    throw new TypeError(`${key} 值不能为 undefined`);
  }

  if (typeof val === 'string') {
    const strVal = val.replace(/--/g, '\\-\\-');

    return /^\d+$/.test(strVal) ? val : `'${strVal}'`;
  }

  return val as string;
};
