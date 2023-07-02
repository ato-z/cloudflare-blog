const path = require('path');
const fs = require('fs');
const wranglerConfig = require('../.wrangler.json');
const domainConfig = require('../.domain.json');
const prettier = require('prettier');
const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.prettierrc')),
);

const domainApi = domainConfig.zerg.api;

// 路径配置
const pathMap = (() => {
  const root = path.resolve(__dirname, '../');
  const zerg = path.resolve(root, 'zerg');
  const modules = path.resolve(zerg, 'modules');

  const moduleList = fs.readdirSync(modules).filter(moduleName => {
    // 如果为.开头，则跳过
    if (/^\./.test(moduleName)) {
      return false;
    }

    const curPath = path.join(modules, moduleName);
    try {
      const stat = fs.statSync(curPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  });

  const sql = path.resolve(root, 'sql');
  const sqlList = fs.readdirSync(sql).filter(file => {
    // 如果为.开头，则跳过
    if (/^\./.test(file)) {
      return false;
    }

    return /\.sql$/i.test(file);
  });

  const page = path.resolve(root, 'web');
  const pageBuild = path.resolve(page, 'dist');
  return { root, zerg, modules, moduleList, sql, sqlList, page, pageBuild };
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
      eachArr(value, `\n[[${keyName}]]\n`);
    } else if (type === 'object' && value !== null) {
      eachArr([value], `\n[${keyName}]\n`);
    } else if (type === 'boolean') {
      const target = value ? 'true' : 'flase';
      tomlLine.push(`${keyName}=${target}\n`);
    } else if (type === null) {
      tomlLine.push(`${keyName}=null\n`);
    }
  };

  const eachArr = (arr, newLine = '') => {
    arr.forEach(obj => {
      tomlLine.push(`${newLine}`);
      Object.keys(obj)
        .sort(cur => {
          const type = typeof obj[cur];
          return type === 'string' || type === 'number' ? -1 : 0;
        })
        .forEach(key => {
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

  fs.writeFileSync(path.resolve(pathMap.root, '.wrangler.json'), codeJson);
};

/** 判断路径是否存在 */
const withDir = dir => {
  try {
    return fs.statSync(dir);
  } catch {
    return null;
  }
};

/** pages配置 */
const pages = (() => {
  const name = `zerg-web-${wranglerConfig.name}`;
  return { name };
})();

module.exports = {
  pathMap,
  toToml,
  wranglerConfig,
  domainApi,
  prettierrc,
  upWranglerConfig,
  withDir,
  pages,
};
