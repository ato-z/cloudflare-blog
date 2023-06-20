/**
 * 发布
 */
const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');
const { pathMap } = require('../helper');

const { moduleList, modules } = pathMap;

const deployModule = moduleName => {
  const wranglerMain = path.join(modules, moduleName);
  shell.exec(`cd ${wranglerMain} && wrangler deploy --minify`);
};

const all = '🐻 ALL';
const choices = [all, ...moduleList];

inquirer
  .prompt(
    {
      type: 'list',
      name: 'moduleName',
      message: '选择文件夹发布',
      choices,
    },
    choices,
  )
  .then(({ moduleName }) => {
    if (moduleName === all) {
      moduleList.forEach(deployModule);
    } else {
      deployModule(moduleName);
    }
  });
