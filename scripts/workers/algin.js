/**
 * 对齐配置
 */
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const {
  wranglerConfig,
  pathMap,
  toToml,
  prettierrc,
  domainApi,
} = require('../helper');
const { d1Databases, kvNamespaces, r2Buckets } = wranglerConfig;

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

  Object.assign(extendConfig, {
    routes: [
      { pattern: domainApi.target, customDomain: true },
      {
        pattern: `${domainApi.target}/${moduleName}/*`,
        zoneId: domainApi.zoneId,
      },
    ],
  });

  const config = {
    ...extendConfig,
    ...wranglerConfig,
    ...extendConfig,
  };

  const content = toToml(config);
  const tomlDir = path.resolve(dir, 'wrangler.toml');
  fs.writeFileSync(tomlDir, content);

  const extendDir = path.resolve(dir, 'extend.wrangler.json');
  fs.writeFileSync(
    extendDir,
    prettier.format(JSON.stringify(extendConfig), {
      ...prettierrc,
      parser: 'json',
    }),
  );
});

/** 更新.d.ts类型 */
const cliEnvEntries = [];
d1Databases.forEach(d1 => {
  cliEnvEntries.push([d1.binding, 'D1Database']);
});
kvNamespaces.forEach(kv => {
  cliEnvEntries.push([kv.binding, 'KVNamespace']);
});
r2Buckets.forEach(r2 => {
  cliEnvEntries.push([r2.binding, 'R2Bucket']);
});
const cliEnv = Object.fromEntries(cliEnvEntries);
const wranglerEnv = `
/** 请勿修改, 由脚本维护 */
declare type WranglerAutoEnv = ${JSON.stringify(cliEnv).replace(/"/g, '')}
`;

const WranglerAutoEnv = prettier.format(wranglerEnv, {
  ...prettierrc,
  parser: 'typescript',
});
fs.writeFileSync(
  path.resolve(pathMap.root, 'types', 'wrangler-auto.d.ts'),
  WranglerAutoEnv,
);
