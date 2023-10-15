// eslint-disable-next-line import/no-unresolved,n/no-extraneous-import
import config from '@lzear/eslint-config-typescript'
import eslintPlugin from 'eslint-plugin-eslint-plugin/configs/all'

export default [
  ...config,
  eslintPlugin,
  {
    ignores: [
      'utils/eslint-types/**',
      'coverage/**/*',
      'rules/utils/**',
      'rules/shared/**',
      'rules/fix/**',
      'rules/ast/**',
    ],
  },
  {
    rules: {
      'eslint-plugin/require-meta-docs-url': 0,
    },
  },
]
