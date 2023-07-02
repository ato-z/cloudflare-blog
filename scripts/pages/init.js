const sh = require('shelljs');
const { pages } = require('../helper');

sh.exec(
  `wrangler pages project create ${pages.name} --production-branch production`,
);
