const fs = require('fs');
const Log = require('@entando/log');

const createDirectory = (dirName, appName) => {
  if (fs.existsSync(dirName)) {
    Log.error(`the directory \`${dirName}\` for the \`${appName}\` app already exists`).empty();
    process.exit();
  }

  Log.info(`create directory \`./${dirName}\``)
  fs.mkdirSync(dirName);
  Log.success('directory created').empty();
};

module.exports = createDirectory;
