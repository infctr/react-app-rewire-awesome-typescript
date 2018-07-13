# react-app-rewire-awesome-typescript

Add [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) to a [react-app-rewired](https://github.com/timarney/react-app-rewired) config.

A fork of [react-app-rewire-typescript](https://github.com/lwd-technology/react-app-rewire-typescript) by [@icopp](https://github.com/icopp)

### ⚠️ NOT TESTED FOR PRODUCTION BUILDS ⚠️

## How it works

- Tell Webpack the entry file doesn't have to be a `.js` file, just any `index` file
- Add a rule in Webpack config to parse `.ts|tsx` files with `awesome-typescript-loader` and Babel

## Installation

with npm

```
npm install --save-dev react-app-rewire-awesome-typescript
```

or with yarn

```
yarn add -D react-app-rewire-awesome-typescript
```

## Usage

```js
/* config-overrides.js */

const rewireTypescript = require('react-app-rewire-awesome-typescript');

module.exports = function override(config, env) {
  // ...
  config = rewireTypescript(config, env);
  // ...
  return config;
};
```

## Options

_TODO_
