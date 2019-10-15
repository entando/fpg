# Entando APP_NAME

This project contains the `App Builder` screens for the APP_NAME app of Entando.

---

# Developer Prerequesites

It is recommended to install `npm-install-peers` (`npm i -g npm-install-peers`) to install peer dependencies. So when you install npm dependencies, you can only install at one command: `npm i && npm-install-peers` - this will download all your dependencies specified in `package.json` including the `peerDependencies`. This is to enable standalone mode during development phases. Take note that whenever you install a new npm module, this will erase all the peer dependencies, so you have to re-run `npm-install-peers` after installing.

# Configuration example

Put following config into `.env.local` file to configure your app for local development:
```
NODE_PATH=src/
REACT_APP_DOMAIN=http://tests.serv.run/entando-sample
REACT_APP_USE_MOCKS=false
REACT_APP_CLIENT_ID=appbuilder
REACT_APP_CLIENT_SECRET=appbuilder_secret
```

# Integration with app-builder

Check the `app-builder` README.

---

# Code Styling Rules

here follow the rules when it comes to code styling.

## Linting
Several linting standards have been applied to the project. On the git `pre-commit` hook all the linters are being run through the project.
It is possible to disable a specific linting rule for one row of a file, but the linter should never been disabled for the entire file nor the entirety of the linter should be disabled for the given line.

A good instance in which it is recommended to disable the linter on a file is when doing a named export in a file that currently only posses one export (i.e. `types` files in states).

## Testing

A code coverage of 90% should be applied to any file that is not part of the UI. This includes eventual helpers, states related files, etc...

To test the code coverage, use command `npm run coverage` and see the results after testing or if you want to see more details of the test, locate the `coverage/lcov-report` to browse detailed results.
