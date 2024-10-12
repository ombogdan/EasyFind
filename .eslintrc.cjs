module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  globals: {
    __DEV__: "readonly"
  },
  extends: ['airbnb', 'plugin:react/recommended', 'eslint-config-prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    "no-console": "off",
    "no-nested-ternary": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.ts'],
      },
    ],
    camelcase: 'off',
    "import/no-unresolved": "off",
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'global-require': 'off',
    'linebreak-style': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'consistent-return': 'off',
    'no-use-before-define': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/require-default-props': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'config',
          'failedRequest',
          'prevState',
        ],
      },
    ],
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.native.js'],
      },
      "babel-module": {}
    },
  },
};
