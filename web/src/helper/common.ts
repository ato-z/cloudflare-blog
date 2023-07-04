/**
 * 设置页面标题
 */
export const upDocumentTitle = (title: string) => {
  document.title = title;
};

/**
 * 补零操作
 */
export const fillZero = (n: number | string) => {
  const codeN = n.toString();
  return codeN.length > 1 ? n : '0' + n;
};
