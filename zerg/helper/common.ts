import { siteConfig } from '@web/config';
const { staticDomain } = siteConfig;
export const codeOssPath = (path: string) =>
  `${staticDomain}/${path}`.replace(/\/+/g, '/');
