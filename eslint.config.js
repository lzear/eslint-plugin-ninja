let eslintPlugin = require('eslint-plugin-eslint-plugin/configs/all')
let config = require('@azat-io/eslint-config-typescript')
let tailwind = require('eslint-plugin-tailwindcss')

module.exports = [
  ...config,
  eslintPlugin,
  tailwind.configs.recommended,
  {
    ignores: ['**/.vitepress/cache/**/*'],
  },
  {
    rules: {
      'eslint-plugin/require-meta-docs-url': 'off',
    },
  },
  {
    files: ['**/test/*', '**/rules/*', '**/docs/.vitepress/config.ts'],
    rules: {
      'perfectionist/sort-objects': 'off',
    },
  },
]
