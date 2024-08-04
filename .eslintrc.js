module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['src/public', 'src/views', 'tests'],
  rules: {
    'no-unused-vars': 'off',
    'consistent-return': 'off',
    'linebreak-style': 0,
    'no-console': 'off',
    camelcase: 'off',
  },
};
