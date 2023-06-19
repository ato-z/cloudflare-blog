/**
 * 启动开发环境
 */
const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');
const { pathMap } = require('../helper');

const { moduleList, modules } = pathMap;

const devModule = moduleName => {
  const wranglerMain = path.join(modules, moduleName);
  shell.exec(`cd ${wranglerMain} && wrangler dev`);
};

inquirer
  .prompt(
    {
      type: 'list',
      name: 'moduleName',
      message: '选定开发目录进行调试',
      choices: moduleList,
    },
    moduleList,
  )
  .then(({ moduleName }) => devModule(moduleName));
