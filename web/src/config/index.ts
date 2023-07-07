import { zerg, web } from '@root/.domain.json';
export const siteConfig = {
  domain: `https://${zerg.api.target}`,
  /** 测试环境 */
  // domain: 'http://127.0.0.1:8787',

  /** 静态资源地址 */
  staticDomain: web.static,
};
