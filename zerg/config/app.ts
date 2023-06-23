export const appConfig = {
  /** 数据库配置 */
  database: {
    tablePrefix: 'az_',
    dbname: 'DB',
  },
  /** 网站 */
  site: {
    title: '博客后台管理',
  },
  /** 随机加密盐 */
  hash: '2K1cL@%KMT$mymP7',
  /** 有效期 */
  expTime: {
    sign: 2592000, // 30天 = 30 * 24 * 3600
    token: 7200, // 7200秒
  },
};
