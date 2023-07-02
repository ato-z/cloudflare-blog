const sh = require('shelljs');
const { pathMap } = require('../helper');

sh.cd(pathMap.page);

sh.exec('npm run dev');
