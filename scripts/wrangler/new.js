const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const {
  pathMap,
  withDir,
  prettierrc,
  wranglerConfig,
  toToml,
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
  if (withDir(extendJsonDir) === null) {
    const content = `{ "name": "${name}", "main": "index.ts" }\n`;
    fs.writeFileSync(extendJsonDir, content);
  }

  const tomlDir = path.resolve(dir, 'wrangler.toml');
  if (withDir(tomlDir) === null) {
    const config = { name, main: 'index.ts', ...wranglerConfig };
    config.name = name;
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
