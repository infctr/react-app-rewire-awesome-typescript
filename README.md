# react-app-rewire-awesome-typescript

Add [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) to a [react-app-rewired](https://github.com/timarney/react-app-rewired) config.

## How it works

- Tell Webpack the entry file doesn't have to be a `.js` file, just any `index` file
- Add a rule in Webpack config to parse `.ts|tsx` files with `awesome-typescript-loader` and Babel

## Prerequisites

`awesome-typescript-loader` requires Webpack 4 hooks so be sure to use it with `react-scripts@next` and `react-app-rewired@2.0.0`.

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

### ⚠️ NOT TESTED FOR PRODUCTION BUILDS ⚠️

```js
/* config-overrides.js */

const rewireTypescript = require('react-app-rewire-awesome-typescript');

module.exports = function override(config, env) {
  // some rewires
  config = rewireTypescript(config, env, options);
  // ...
  return config;
};
```

or using `compose`

```js
const { compose } = require('react-app-rewired');

module.exports = compose(
  // some rewires
  rewireTypescript(options)
  // ...
);
```

## Options

### _useBabel (boolean) (default=false)_

Pass `{ useBabel: true }` to invoke Babel for transpilation. Current config from Webpack will be used.

Refer for other options to `awesome-typescript-loader` [github page](https://github.com/s-panferov/awesome-typescript-loader#loader-options).
