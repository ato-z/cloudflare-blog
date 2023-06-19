/**
 * 对齐配置
 */
const fs = require('fs');
const path = require('path');
const { wranglerConfig, pathMap, toToml } = require('../helper');
const { d1Databases, kvNamespaces } = wranglerConfig;

const { moduleList, modules } = pathMap;

if (d1Databases[0] && typeof d1Databases[0].databaseId !== 'string') {
  throw new Error('🤡 请先初始化数据库\n`npm run wrangler:init`');
}

if (kvNamespaces[0] && typeof kvNamespaces[0].id !== 'string') {
  throw new Error('🤡 请先初始化kv\n`npm run wrangler:init`');
}

moduleList.forEach(moduleName => {
  const dir = path.resolve(modules, moduleName);
  const extendConfig = require(path.resolve(dir, 'extend.wrangler.json'));
  const config = {
    main: extendConfig.main,
    ...wranglerConfig,
    ...extendConfig,
  };
  const content = toToml(config);
  const tomlDir = path.resolve(dir, 'wrangler.toml');
  fs.writeFileSync(tomlDir, content);
});
