const { prettier } = require('./package.json');

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [2, prettier]
  }
};
