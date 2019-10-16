#!/usr/bin/env node

'use strict';

const program = require('commander');
const Log = require('@entando/log');
const nameResolver = require('./modules/nameResolver');
const createDirectory = require('./modules/createDirectory');
const createPackage = require('./modules/createPackage');
const createBoilerplate = require('./modules/createBoilerplate');
const replacePlaceholders = require('./modules/replacePlaceholders');
const { execSync } = require('child_process');
const version = require('./package.json').version;

program.version(version).name('@entando/fpg');

program
  .command('ab-app')
  .description('generates an app-builder app')
  .arguments('<app>')
  .action((app) => {
    Log.title('app-builder app generator').section('create app structure');
    const appDirName = nameResolver.getDirName(app);
    const appName = nameResolver.getAppName(app);
    const boilerplateDir = `${__dirname}/boilerplates/app-builder-app`;

    createDirectory(appDirName, appName);
    createPackage(app, appDirName, boilerplateDir);

    createBoilerplate(appDirName, boilerplateDir);
    replacePlaceholders(appDirName, appName, boilerplateDir);

    Log.section('install dependencies');
    execSync('npm install', { stdio: [0, 1, 2], cwd: appDirName });
  });

program.parse(process.argv);
