import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule'

import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'message'

type Options = []

export const RULE_NAME = 'optimize-string-ternary'

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow repetition when building strings with ternaries',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      message: 'Repetition in string ternary expressions should be avoided',
    },
  },
  defaultOptions: [],
  create: (context: Context): RuleListener => ({
    ConditionalExpression: node => {
      const { consequent, alternate } = node

      if (
        consequent.type === 'Literal' &&
        alternate.type === 'Literal' &&
        typeof consequent.value === 'string' &&
        typeof alternate.value === 'string'
      ) {
        if (consequent.value === alternate.value) return null
        const commonPrefix = findCommonPrefix(consequent.value, alternate.value)
        const commonSuffix = findCommonSuffix(consequent.value, alternate.value)

        if (commonPrefix.length > 0 && commonSuffix.length > 0) {
          return context.report({
            node,
            messageId: 'message',
            fix: fixer => {
              const newConsequent = consequent.value
                .slice(commonPrefix.length)
                .slice(0, -commonSuffix.length)
              const newAlternate = alternate.value
                .slice(commonPrefix.length)
                .slice(0, -commonSuffix.length)
              const newText = `'${commonPrefix}' + (${context.sourceCode.getText(
                node.test,
              )} ? '${newConsequent}' : '${newAlternate}') + '${commonSuffix}'`
              return fixer.replaceText(node, newText)
            },
          })
        }

        if (commonPrefix.length > 0) {
          return context.report({
            node,
            messageId: 'message',
            fix: fixer => {
              const newConsequent = consequent.value.slice(commonPrefix.length)
              const newAlternate = alternate.value.slice(commonPrefix.length)
              const newText = `'${commonPrefix}' + (${context.sourceCode.getText(
                node.test,
              )} ? '${newConsequent}' : '${newAlternate}')`
              return fixer.replaceText(node, newText)
            },
          })
        }

        if (commonSuffix.length > 0) {
          return context.report({
            node,
            messageId: 'message',
            fix: fixer => {
              const newConsequent = consequent.value.slice(
                0,
                -commonSuffix.length,
              )
              const newAlternate = alternate.value.slice(
                0,
                -commonSuffix.length,
              )
              const newText = `(${context.sourceCode.getText(
                node.test,
              )} ? '${newConsequent}' : '${newAlternate}') + '${commonSuffix}'`
              return fixer.replaceText(node, newText)
            },
          })
        }
      }

      return null
    },
  }),
})

const findCommonPrefix = (a: string, b: string) => {
  let prefix = ''
  for (let i = 0; i < Math.min(a.length, b.length); i++)
    if (a[i] === b[i]) prefix += a[i]
    else break
  return prefix
}

const findCommonSuffix = (a: string, b: string) => {
  let suffix = ''
  for (let i = 0; i < Math.min(a.length, b.length); i++)
    if (a[a.length - 1 - i] === b[b.length - 1 - i])
      suffix = a[a.length - 1 - i] + suffix
    else break
  return suffix
}
