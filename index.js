#!/usr/bin/env node

'use strict';

const program = require('commander');
const Log = require('@entando/log');
const nameResolver = require('./modules/nameResolver');
const createDirectory = require('./modules/createDirectory');
const createPackage = require('./modules/createPackage');
const bpGenerator = require('./modules/boilerplateGenerator');
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

    bpGenerator.createBoilerplate(appDirName, boilerplateDir);
    replacePlaceholders(appDirName, appName, boilerplateDir);

    Log.section('install dependencies');
    execSync('npm install', { stdio: [0, 1, 2], cwd: appDirName });
    Log.section('install peer dependencies');
    execSync('npx npm-install-peers', { stdio: [0, 1, 2], cwd: appDirName });
    Log.empty().success('you can now run the app with `npm start`');
  });

program
  .command('react-widget')
  .description('generates an entando react widget')
  .arguments('<name>')
  .action((name) => {
    Log.title('react widget generator').section('create widget structure');
    const widgetDirName = nameResolver.getDirName(name);
    const widgetName = nameResolver.getAppName(name);
    const boilerplateDir = `${__dirname}/boilerplates/react-widgets`;

    createDirectory(widgetDirName, widgetName);
    createPackage(name, widgetDirName, boilerplateDir);

    bpGenerator.createCustomBoilerplate(widgetDirName, boilerplateDir, [
      { 'gitignore': '.gitignore' },
      'jsconfig.json',
      'README.md',
      'src',
      'public',
    ]);
    replacePlaceholders(widgetDirName, widgetName, boilerplateDir);

    Log.section('install dependencies');
    execSync('npm install', { stdio: [0, 1, 2], cwd: widgetDirName });
  });

program.parse(process.argv);
