module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest': true,
  },
  'ignorePatterns': ['.eslintrc.js'],
  'extends': [
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'project': 'tsconfig.json',
    'sourceType': 'module',
  },
  'root': 'true',
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
