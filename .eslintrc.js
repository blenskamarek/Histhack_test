module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react-hooks/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  env: {
    'react-native/react-native': true,
    jest: true
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn'
  }
};
