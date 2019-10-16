const fs = require('fs-extra');
const Log = require('@entando/log');

const createCustomBoilerplate = (dirName, boilerplateDir, paths) => {
  paths.forEach((path) => {
    const source = (typeof path === 'object') ? Object.keys(path)[0]: path;
    const destination = (typeof path === 'object') ? Object.values(path)[0]: path;
    Log.info(`copying ${source}`);
    fs.copySync(`${boilerplateDir}/${source}`, `${dirName}/${destination}`);
    Log.success(`\`${destination}\` copied.`).empty();
  })
};

const createBoilerplate = (dirName, boilerplateDir, additionalPaths = []) => {
  Log.info('creating README');
  fs.copySync(`${boilerplateDir}/README.md`, `${dirName}/README.md`);
  Log.success('`README.md` created').empty();

  Log.info('creating gitignore file');
  fs.copySync(`${boilerplateDir}/gitignore`, `${dirName}/.gitignore`);
  Log.success('`.gitignore` created').empty();

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

  createCustomBoilerplate(dirName, boilerplateDir, additionalPaths);
};

module.exports = {
  createBoilerplate,
  createCustomBoilerplate,
};
