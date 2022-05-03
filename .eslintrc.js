module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb-typescript',
    // 'airbnb/hooks',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/function-component-definition': [2, { namedComponents: ['arrow-function', 'function-declaration'] }],
    '@typescript-eslint/no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'no-plusplus': 'off',
  },
};
