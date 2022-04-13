module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'no-use-before-define': 'off',
  },
};
