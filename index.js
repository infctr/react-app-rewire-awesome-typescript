/* eslint-disable import/no-unresolved */
const fs = require('fs');
const path = require('path');
const { getBabelLoader, loaderNameMatches } = require('react-app-rewired'); // eslint-disable-line import/no-unresolved

const getNestedRules = rule =>
  rule.use || rule.oneOf || (Array.isArray(rule.loader) && rule.loader) || [];

const getLoader = (rules, matcher) =>
  rules.reduce(
    (_, rule, index, list) =>
      matcher(rule)
        ? { rule, index, list }
        : getLoader(getNestedRules(rule), matcher),
    {}
  );

const fileLoaderMatcher = rule => loaderNameMatches(rule, 'file-loader');
const getFileLoader = rules => getLoader(rules, fileLoaderMatcher);

const insertRules = (rules, tsRules) => {
  const { index, list } = getFileLoader(rules);
  list.splice(index, 0, tsRules);
};

const rewireTs = (config, _, tsLoaderOptions = {}) => {
  // Monkey patch react-scripts paths to use just `src` instead of
  // `src/index.js` specifically. Hopefully this can get removed at some point.
  // @see https://github.com/facebookincubator/create-react-app/issues/3052
  const paths = require('react-scripts/config/paths'); // eslint-disable-line global-require

  if (paths) {
    paths.appIndexJs = path.resolve(fs.realpathSync(process.cwd()), 'src');
  }

  // Change the hardcoded `index.js` to just `index`, so that it will resolve as
  // whichever file is available. The use of `fs` is to handle things like
  // symlinks.
  // eslint-disable-next-line no-param-reassign
  config.entry = config.entry
    .slice(0, config.entry.length - 1)
    .concat([path.resolve(fs.realpathSync(process.cwd()), 'src/index')]);

  // Add Typescript files to automatic file resolution for Webpack.
  // eslint-disable-next-line no-param-reassign
  config.resolve.extensions = (config.resolve.extensions || []).concat([
    '.web.ts',
    '.ts',
    '.tsx'
  ]);

  // Set up a Typescript rule.
  const babelLoader = getBabelLoader(config.module.rules);
  const { useBabel } = tsLoaderOptions;
  const { presets, plugins } = babelLoader.options;
  const tsBabelOptions = useBabel
    ? { babelOptions: { presets, plugins, babelrc: false } }
    : {};

  const tsRules = {
    test: /\.(ts|tsx)$/,
    include: paths.srcPaths,
    exclude: [/[/\\\\]node_modules[/\\\\]/],
    use: [
      !useBabel && { loader: babelLoader.loader, options: babelLoader.options },
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: { ...tsLoaderOptions, ...tsBabelOptions }
      }
    ].filter(Boolean)
  };

  // Add the Typescript rule before the file-loader rule.
  insertRules(config.module.rules, tsRules);

  return config;
};

const rewire = (...args) =>
  args.length === 1
    ? (config, env) => rewireTs(config, env, ...args)
    : rewireTs(...args);

module.exports = rewire;
