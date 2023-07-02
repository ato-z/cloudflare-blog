const sh = require('shelljs');
const { pathMap, pages } = require('../helper');

sh.cd(pathMap.page);

console.log('🤹🏿‍♂️ 正在打包');
sh.exec('npm run build', (code, out, err) => {
  if (err) {
    return console.log('🤹🏿‍♂️ 打包失败');
  }

  sh.exec(
    `wrangler pages deploy ${pathMap.pageBuild} --project-name ${pages.name}`,
  );
});
