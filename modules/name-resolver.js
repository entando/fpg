const getDirName = (name) => name.replace('/','-').replace('@','').toLowerCase();
const getAppName = (name) => name.replace(/@?[a-zA-Z]{1,}\/([a-zA-Z]{1,})/, '$1').toLowerCase();

module.exports = {
  getDirName,
  getAppName,
};
