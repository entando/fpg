#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const Log = require('@entando/log');
const nameResolver = require('./modules/name-resolver');
const packageGenerator = require('./modules/package-generator');
const boilerplateGenerator = require('./modules/boilerplate-generator');
const replaceMapper = require('./modules/replace-mapper');
const { execSync } = require('child_process');

program.version('1.0.0').name('@entando/fpg');

program
  .command('ab-app')
  .description('generates an app-builder app')
  .arguments('<app>', 'the app name, i.e. @entando/whatever')
  .action((app) => {
    Log.title('app-builder app generator').section('create app structure');
    const appDirName = nameResolver.getDirName(app);
    const appName = nameResolver.getAppName(app);
    if (fs.existsSync(appDirName)) {
      Log.error(`the directory '${appDirName}' for the '${app}' app already exists`).empty();
      process.exit();
    }

    Log.info(`create directory './${appDirName}'`)
    fs.mkdirSync(appDirName);
    Log.success('directory created').empty();

    const boilerplateDir = `${__dirname}/boilerplates/app-builder-app`;

    Log.info('creating package file');
    packageGenerator(app, appDirName, boilerplateDir);
    Log.success('package.json created').empty();

    boilerplateGenerator(appDirName, boilerplateDir);
    replaceMapper(appDirName, appName, boilerplateDir);

    Log.section('install dependencies');
    execSync('npm install', { stdio: [0, 1, 2], cwd: appDirName });
  });

program.parse(process.argv);
