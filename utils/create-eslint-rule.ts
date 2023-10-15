import { ESLintUtils } from '@typescript-eslint/utils'

export const createEslintRule = ESLintUtils.RuleCreator(
  ruleName => `https://www.dont.ninja/rules/${ruleName}`,
)
