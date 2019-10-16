# Frontend Project Generator

this `npx` script generates frontend projects for entando.

the given commands are available:

- `npx @entando/fpg ab-app <appName>`: generates an app-builder app.
- `npx @entando/fpg react-widget <name>`: generates a react widget.

## Extending fpg

fpg can be used to generate any frontend project and can easily be extended to add different blueprints.

### add the new boilerplate in the `boilerplates` directory.

a new directory has to be created and it should contain all the files that are going to be copied when generating the empty project.

### add the new command in commander using as an example the `ab-app` command

```js
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
```

several utilities are used within the command:

#### `nameResolver.getDirName(name)`

returns a kebab case version of the given name, removing any `@` prefix.

i.e.

@entando/whatever -> entando-whatever

#### `nameResolver.getAppName(name)`

returns the app name without the vendor scope.

i.e.

@entando/whatever -> whatever

#### `createDirectory(dirName, appName)`

creates in the cwd a directory with the given `dirName`.
`appName` is just used to display information with Log.

#### `createPackage(app, dirName, boilerplateDir)`

creates the package.json file replacing the `name` property with the value of `app`.
this function copies the file `package` inside the boilerplate directory and renames it `package.json`

`dirName` is the path of the directory created by `createDirectory()`.
`boilerplateDir` is the path of the boilerplate directory of the generated project.

#### `bpGenerator.createBoilerplate(dirName, boilerplateDir, additionalPaths = [])`

copies over the boilerplate files from the boilerplate directory to the project directory.
`dirName` is the path of the directory created by `createDirectory()`.
`boilerplateDir` is the path of the boilerplate directory of the generated project.
`paths` is an array of paths of files / directories that need to be copied over. Each path should be relative to `boilerplateDir`. If the files need to be renamed an object can be passed instead:

```js
[
  { 'gitignore': '.gitignore' },
  'jsconfig.json',
  'README.md',
  'src',
  'public',
]
```

the given files and directories are being copied over:

- README.md
- gitignore renamed in .gitignore
- .env
- .sass-lint.yml
- jsconfig.json
- public/
- src/

#### `bpGenerator.createCustomBoilerplate(dirName, boilerplateDir, paths)`
copies over the boilerplate files from the boilerplate directory to the project directory.
`dirName` is the path of the directory created by `createDirectory()`.
`boilerplateDir` is the path of the boilerplate directory of the generated project.
`additionalPaths` is an array of paths of additional files / directories that need to be copied over. Each path should be relative to `boilerplateDir`. If the files need to be renamed an object can be passed instead:

```js
[
  { 'gitignore': '.gitignore' },
  'jsconfig.json',
  'README.md',
  'src',
  'public',
]
```

#### `replacePlaceholders(dirName, appName, boilerplateDir)`

gets the list of files that needs replacement from the `replace-mapping.js` module that is in the root of the given boilerplate.

Each file is opened and every instance of `APP_NAME` is replaced by the lowercase version of `appName` while every instance of `UCASE_APP_NAME` is replaced by the uppercase version of `appName`.

`dirName` is the path of the directory created by `createDirectory()`.
`appName` is the name of the app.
`boilerplateDir` is the path of the boilerplate directory of the generated project.
