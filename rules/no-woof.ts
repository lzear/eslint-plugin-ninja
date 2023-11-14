import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule'

import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'match'

type Options = [unknown]

export const RULE_NAME = 'no-woof'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow woof!',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      match: 'No woof! Found "{{ match }}".',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => {
    const sourceCode = context.getSourceCode()
    const regex = /w[0o]{2}f/gi
    return {
      Program: () => {
        for (const token of sourceCode.tokensAndComments) {
          const text = sourceCode.getText(token)
          if (regex.test(text)) {
            const match = text.match(regex)
            const replacement = text.replaceAll(regex, '')
            context.report({
              node: token,
              messageId: 'match',
              data: { match: match?.[0] },
              fix: fixer => fixer.replaceText(token, replacement),
            })
          }
        }
      },
    }
  },
})
