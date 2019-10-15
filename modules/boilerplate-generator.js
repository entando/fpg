const fs = require('fs-extra');
const Log = require('@entando/log');

const boilerplateGenerator = (dirName, boilerplateDir) => {
  Log.info('creating README');
  fs.copySync(`${boilerplateDir}/README.md`, `${dirName}/README.md`);
  Log.success('README.md created').empty();

  Log.info('creating gitignore file');
  fs.copySync(`${boilerplateDir}/gitignore`, `${dirName}/.gitignore`);
  Log.success('.gitignore created').empty();

  Log.info('copying configuration files');
  fs.copySync(`${boilerplateDir}/.env`, `${dirName}/.env`);
  fs.copySync(`${boilerplateDir}/.sass-lint.yml`, `${dirName}/.sass-lint.yml`);
  fs.copySync(`${boilerplateDir}/jsconfig.json`, `${dirName}/jsconfig.json`);
  Log.success('`.env`, `jsconfig.json` and `.sass-lint.yml` files copied').empty();

  Log.info('copying public dir');
  fs.copySync(`${boilerplateDir}/public`, `${dirName}/public`);
  Log.success('`public` directory and files copied`').empty();

  Log.info('copying src dir');
  fs.copySync(`${boilerplateDir}/src`, `${dirName}/src`);
  Log.success('`src` directory and files copied`').empty();
};

module.exports = boilerplateGenerator;
