// eslint-disable-next-line import/no-unresolved,n/no-extraneous-import
import eslintPlugin from 'eslint-plugin-eslint-plugin/configs/all'

export default [
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
