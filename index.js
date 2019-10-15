#!/usr/bin/env node

'use strict';

const program = require('commander');
const Log = require('@entando/log');
const nameResolver = require('./modules/name-resolver');
const directoryGenerator = require('./modules/directory-generator');
const packageGenerator = require('./modules/package-generator');
const boilerplateGenerator = require('./modules/boilerplate-generator');
const replaceMapper = require('./modules/replace-mapper');
const { execSync } = require('child_process');
const version = require('./package.json').version;

program.version(version).name('@entando/fpg');

program
  .command('ab-app')
  .description('generates an app-builder app')
  .arguments('<app>', 'the app name, i.e. @entando/whatever')
  .action((app) => {
    Log.title('app-builder app generator').section('create app structure');
    const appDirName = nameResolver.getDirName(app);
    const appName = nameResolver.getAppName(app);
    const boilerplateDir = `${__dirname}/boilerplates/app-builder-app`;

    directoryGenerator(appDirName, appName);
    packageGenerator(app, appDirName, boilerplateDir);

    boilerplateGenerator(appDirName, boilerplateDir);
    replaceMapper(appDirName, appName, boilerplateDir);

    Log.section('install dependencies');
    execSync('npm install', { stdio: [0, 1, 2], cwd: appDirName });
  });

program.parse(process.argv);
