import { siteConfig } from '@web/config';
const { staticDomain } = siteConfig;
export const codeOssPath = (path: string) => {
  const url = `${staticDomain}/${path}`.replace(/\/+/g, '/');
  return `https://${url}`;
};
