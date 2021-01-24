module.exports = {
  ignorePatterns: ['node_modules', 'lib', 'index.js', '!.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    warnOnUnsupportedTypeScriptVersion: true
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-unused-expressions': 'warn',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-throw-literal': 'warn',
    'no-loop-func': 'error',
    'no-await-in-loop': 'error',
    'array-callback-return': 'error',
    'no-invalid-this': 'off',
    'no-new-wrappers': 'error',
    'no-restricted-imports': [
      'error',
      'rxjs',
      '@material-ui/core',
      '@material-ui/icons'
    ],
    'no-console': 'error',
    'no-undef-init': 'off',
    radix: 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-namespace': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'sonarjs/cognitive-complexity': 'warn',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-redundant-jump': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'no-multiple-empty-lines': 'error',
    curly: 'warn',
    'sort-keys': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'warn',
    'no-mixed-requires': 'warn',
    'spaced-comment': 'warn',
    'object-shorthand': 'warn',
    'prettier/prettier': 'warn'
  },
  overrides: [
    {
      files: ['webpack*.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
