const fs = require('fs-extra');

const packageGenerator = (app, dirName, boilerplateDir) => {
  const fileContent = fs.readJsonSync(`${boilerplateDir}/package.json`);
  fileContent.name = app;
  fileContent.description = `${app} CMS app`;
  fs.writeJsonSync(`${dirName}/package.json`, fileContent, { spaces: 2 });
};

module.exports = packageGenerator;
