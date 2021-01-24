module.exports = {
  ignorePatterns: [
    'node_modules',
    'build',
    '.storybook',
    'e2e',
    'public',
    '!.eslintrc.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    warnOnUnsupportedTypeScriptVersion: true
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'sonarjs',
    'ramda',
    'cypress',
    'prettier',
    'testing-library',
    'scanjs-rules',
    'xss'
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended',
    'plugin:ramda/recommended',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react'
  ],
  rules: {
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_'
    }],
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
    'no-console': 'off',
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
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-no-bind': 'off',
    'react/no-unescaped-entities': 'warn',
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-redundant-jump': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'ramda/prefer-ramda-boolean': 'off',
    'no-multiple-empty-lines': 'error',
    'curly': 'warn',
    'sort-keys': 'off',
    'comma-dangle': 'warn',
    'no-trailing-spaces': 'warn',
    'no-mixed-requires': 'warn',
    'spaced-comment': 'warn',
    'object-shorthand': 'warn',
    'prettier/prettier': 'warn',
    'scanjs-rules/assign_to_hostname': 'warn',
    'scanjs-rules/assign_to_href': 'warn',
    'scanjs-rules/assign_to_location': 'warn',
    'scanjs-rules/assign_to_onmessage': 'warn',
    'scanjs-rules/assign_to_pathname': 'warn',
    'scanjs-rules/assign_to_protocol': 'error',
    'scanjs-rules/assign_to_search': 'warn',
    'scanjs-rules/assign_to_src': 'warn',
    'scanjs-rules/call_addEventListener': 'warn',
    'scanjs-rules/call_Function': 'error',
    'scanjs-rules/call_parseFromString': 'error',
    'scanjs-rules/new_Function': 'error',
    'scanjs-rules/property_crypto': 'error',
    'scanjs-rules/property_geolocation': 'error',
    'xss/no-mixed-html': [
      'error',
      {
        htmlVariableRules: ['__html', 'sanitize/i'],
        functions: {
          sanitizeHTML: {
            htmlInput: true,
            htmlOutput: true,
            safe: true
          }
        }
      }
    ]
  },
  env: {
    browser: true
  },
  overrides: [{
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_'
          }
        ]
      }
    },
    {
      files: ['*js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    },
    {
      files: [
        '**/*.test.*',
        '**/*.spec.js',
        '**/*.stories.js',
        'scripts/**',
        'config/**',
        'cypress/**'
      ],
      rules: {
        'array-callback-return': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
      },
      env: {
        node: true
      }
    },
    {
      files: ['scripts/**', 'config/**', 'cypress/**'],
      rules: {
        'no-console': 'off',
        'testing-library/await-async-query': 'off',
        'no-multiple-empty-lines': 'off',
        'radix': 'off'
      },
      env: {
        node: true,
        'cypress/globals': true
      }
    }
  ]
}