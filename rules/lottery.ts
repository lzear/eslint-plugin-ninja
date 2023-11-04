import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
import { complete } from '../utils/complete.js'

type MESSAGE_ID = 'badluck'

type Options = [
  Partial<{
    probability: number
  }>,
]

export const RULE_NAME = 'lottery'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'require luck',
    },
    schema: [
      {
        type: 'object',
        properties: {
          probability: {
            type: 'number',
            minimum: 0,
            maximum: 1,
            default: 0.99,
          },
        },
      },
    ],
    messages: {
      badluck:
        '`{{ roll }} > {{ probability }}` Bad luck! You rolled `{{ roll }}` but should have rolled `{{ probability }}` or less.',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => {
    const { probability } = complete(context.options.at(0), {
      probability: 0.99,
    })
    return {
      Program: () => {
        const roll = Math.random()
        if (roll >= probability) {
          context.report({
            messageId: 'badluck',
            data: { roll, probability },
            loc: { column: 0, line: 1 },
          })
        }
      },
    }
  },
})
