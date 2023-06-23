/** 部署d1数据库生产环境 */
const oraPromise = import('ora');
const path = require('path');
const sh = require('shelljs');
const { pathMap } = require('../helper');

const files = [...pathMap.sqlList].map(file => path.resolve(pathMap.sql, file));

const trigger = spinner => {
  const curFile = files.shift();
  if (curFile === undefined) {
    spinner.stop();
    return sh.exit();
  }

  spinner.start(curFile);
  const databaseName = 'DB';
  sh.exec(`wrangler d1 execute ${databaseName} --file=${curFile}`, () =>
    trigger(spinner),
  );
};

sh.cd(path.resolve(pathMap.modules, 'static'));

oraPromise.then(ora => {
  const spinner = ora.default('').start();
  spinner.color = 'yellow';
  spinner.prefixText = '🦁 Exec sql file';

  trigger(spinner);
});
