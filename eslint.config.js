// eslint-disable-next-line import/no-unresolved,n/no-extraneous-import
import eslintPlugin from 'eslint-plugin-eslint-plugin/configs/all'
import config from '@azat-io/eslint-config-typescript'

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
      '.vercel/**',
      '.vitepress/cache/**',
      '.vitepress/dist/**',
    ],
  },
  {
    rules: {
      'eslint-plugin/require-meta-docs-url': 0,
      'perfectionist/sort-objects': 0,
      'perfectionist/sort-named-imports': 0,
      'perfectionist/sort-union-types': 0,
      'perfectionist/sort-interfaces': 0,
      'prefer-let/prefer-let': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,
      curly: 0,
    },
  },
]
