const fs = require('fs-extra');
const Log = require('@entando/log');

const createPackage = (app, dirName, boilerplateDir) => {
  Log.info('creating package file');
  const fileContent = fs.readJsonSync(`${boilerplateDir}/package`);
  fileContent.name = app;
  fileContent.description = fileContent.description.replace('APP_NAME', app);
  fs.writeJsonSync(`${dirName}/package.json`, fileContent, { spaces: 2 });
  Log.success('package.json created').empty();
};

module.exports = createPackage;
