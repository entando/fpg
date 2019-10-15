const fs = require('fs');
const Log = require('@entando/log');

const replaceMapper = (dirName, appName, boilerplateDir) => {
  const mapping = require(`${boilerplateDir}/replace-mapping`);
  Log.section('replacing placeholders')
  mapping.forEach((file) => {
    const content = fs
      .readFileSync(`${dirName}/${file}`, 'utf-8')
      .replace(/UCASE_APP_NAME/g, appName.toUpperCase())
      .replace(/APP_NAME/g, appName);
    fs.writeFileSync(`${dirName}/${file}`, content);
    Log.info(`replaced ${file}`);
  });
  Log.success('replaced all placeholders');
};

module.exports = replaceMapper;
