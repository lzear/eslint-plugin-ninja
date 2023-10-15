import { ESLintUtils } from '@typescript-eslint/utils'

export let createEslintRule = ESLintUtils.RuleCreator(
  ruleName => `https://www.dont.ninja/rules/${ruleName}`,
)
