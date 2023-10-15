import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'

type MESSAGE_ID = 'match'

type Options = [unknown]

export const RULE_NAME = 'monopoly'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow bad eslint configs',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      match: 'Only eslint-config-dont is allowed, but found "{{ match }}".',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => {
    const { sourceCode } = context
    const regex = /eslint-config-(?!dont\b)[\dA-Za-z]+/g
    return {
      Program: () => {
        const comments = sourceCode.getAllComments()
        for (const comment of comments) {
          const matches = comment.value.match(regex)
          if (matches) {
            context.report({
              node: comment,
              messageId: 'match',
              data: { match: matches[0] },
            })
          }
        }
      },
      Literal: node => {
        if (typeof node.raw === 'string' && regex.test(node.raw)) {
          const match = node.raw.match(regex)
          const replacement = node.raw.replaceAll(regex, 'eslint-config-dont')
          context.report({
            node,
            messageId: 'match',
            data: { match: match?.[0] },
            fix: fixer => fixer.replaceText(node, replacement),
          })
        }
      },
    }
  },
})
