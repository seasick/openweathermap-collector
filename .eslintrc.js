module.exports = {
  ignorePatterns: [
    'temp.js',
    '**/vendor/*.js',
  ],
  env: {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  extends: [
    'google',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
  },
};
