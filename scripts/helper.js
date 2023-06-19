const path = require('path');
const fs = require('fs');
const wranglerConfig = require('../.wrangler.json');
const prettier = require('prettier');
const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.prettierrc')),
);

// 路径配置
const pathMap = (() => {
  const root = path.resolve(__dirname, '../');
  const zerg = path.resolve(root, 'zerg');
  const modules = path.resolve(zerg, 'modules');

  const moduleList = fs.readdirSync(modules).filter(moduleName => {
    // 如果为.开头，则跳过
    if (/^\./.test(moduleName)) {
      return undefined;
    }

    const curPath = path.join(modules, moduleName);
    try {
      const stat = fs.statSync(curPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  });
  return { root, zerg, modules, moduleList };
})();

/** 大写字母转下划线 */
const convert_ = input =>
  input.replace(/([A-Z])\w/g, substring => `_${substring.toLowerCase()}`);
/** 对象转 toml 配置 */
const toToml = obj => {
  const tomlLine = [];
  const pushTomlLine = (key, value) => {
    const keyName = convert_(key);
    const type = typeof value;
    if (type === 'string') {
      tomlLine.push(`${keyName}="${value}"\n`);
    } else if (type === 'number') {
      tomlLine.push(`${keyName}=${value}\n`);
    } else if (value instanceof Array && typeof value[0] === 'object') {
      tomlLine.push(`\n[[${keyName}]]\n`);
      eachArr(value);
    } else if (typeof value === 'object' && value !== null) {
      tomlLine.push(`\n[${keyName}]\n`);
      eachArr([value]);
    }
  };

  const eachArr = arr => {
    arr.forEach(obj => {
      Object.keys(obj).forEach(key => {
        const keyName = convert_(key);
        const value = obj[key];

        pushTomlLine(keyName, value);
      });
    });
  };

  eachArr([obj]);

  return tomlLine.join('');
};

/** 更新公共配置 */
const upWranglerConfig = obj => {
  Object.assign(wranglerConfig, obj);
  const codeJson = prettier.format(JSON.stringify(wranglerConfig), {
    ...prettierrc,
    parser: 'json',
  });

  fs.writeFileSync(path.resolve(pathMap.root, 'wrangler.json'), codeJson);
};

/** 判断路径是否存在 */
const withDir = dir => {
  try {
    return fs.statSync(dir);
  } catch {
    return null;
  }
};

module.exports = {
  pathMap,
  toToml,
  wranglerConfig,
  prettierrc,
  upWranglerConfig,
  withDir,
};
