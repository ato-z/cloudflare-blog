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
  /** 图片首次上次时的，默认颜色 */
  defaultColor: '#f2f2f2',
  maxImgFile: 5000000, // 最大图片大小 5M 5*1000*1000
};
