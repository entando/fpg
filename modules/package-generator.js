const fs = require('fs-extra');
const Log = require('@entando/log');

const packageGenerator = (app, dirName, boilerplateDir) => {
  Log.info('creating package file');
  const fileContent = fs.readJsonSync(`${boilerplateDir}/package`);
  fileContent.name = app;
  fileContent.description = `${app} CMS app`;
  fs.writeJsonSync(`${dirName}/package.json`, fileContent, { spaces: 2 });
  Log.success('package.json created').empty();
};

module.exports = packageGenerator;
