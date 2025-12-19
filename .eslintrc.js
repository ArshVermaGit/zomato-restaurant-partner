module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false,
      'varsIgnorePattern': '^_',
      'argsIgnorePattern': '^_'
    }],
    'react/no-unstable-nested-components': ['error', { 'allowAsProps': true }]
  },
};
