# GitHub Explorer, Test application (Angular 2 + Webpack)

## Quick start
**Make sure you have Node version >= 5.0 and NPM >= 3**

```bash
# clone our repo
git clone https://github.com/j-and/Github-API-Search.git

# change directory to the repo
cd Github-API-Search

# install global dependencies
npm install webpack-dev-server rimraf webpack typescript -g

# install the repo with npm
npm install

# start the server
npm start
```

go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

## Other commands

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### run server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

### watch and build files
```bash
npm run watch
```

### run tests
```bash
npm run test
```

### watch and run tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# make sure you have your server running in another terminal
npm run e2e
```

### run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

### run Protractor's elementExplorer (for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```
