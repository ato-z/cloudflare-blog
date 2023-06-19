const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const {
  pathMap,
  withDir,
  prettierrc,
  wranglerConfig,
  toToml,
  domain,
} = require('../helper');
/**
 * 创建一个新模块
 */
const args = process.argv;
const [, , ...modules] = args;

if (modules.length < 1) {
  throw new Error(
    '🙊 模块名不能为空\nFor example: `npm run wrangler:new <YOUR MODULES_NAME>`',
  );
}

const touchModule = moduleName => {
  const dir = path.resolve(pathMap.modules, moduleName);
  const name = `${wranglerConfig.name}-${moduleName}`;
  if (withDir(dir) === null) {
    fs.mkdirSync(dir);
  }

  const extendJsonDir = path.resolve(dir, 'extend.wrangler.json');
  let extendConfig = {};
  if (withDir(extendJsonDir) === null) {
    const main = 'index.ts';
    const routes = [
      { pattern: domain.target, customDomain: true },
      { pattern: `${domain.target}/${moduleName}/*`, zoneId: domain.zoneId },
    ];
    extendConfig = {
      name,
      main,
      compatibilityDate: wranglerConfig.compatibilityDate,
      routes,
    };
    const content = prettier.format(JSON.stringify(extendConfig), {
      ...prettierrc,
      parser: 'json',
    });
    fs.writeFileSync(extendJsonDir, content);
  } else {
    extendConfig = require(extendJsonDir);
  }

  const tomlDir = path.resolve(dir, 'wrangler.toml');
  if (withDir(tomlDir) === null) {
    const config = { ...extendConfig, ...wranglerConfig, ...extendConfig };
    const content = toToml(config);
    fs.writeFileSync(tomlDir, content);
  }

  const mainPointDir = path.resolve(dir, 'index.ts');
  if (withDir(mainPointDir) === null) {
    const content = `export default {
        fetch() {
          return new Response('hi~${name}');
        },
      };`;
    fs.writeFileSync(
      mainPointDir,
      prettier.format(content, { ...prettierrc, parser: 'babel' }),
    );
  }
};

modules.forEach(m => touchModule(m.toLocaleLowerCase()));
