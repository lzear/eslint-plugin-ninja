import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule'

import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'no'

type Options = []

export const RULE_NAME = 'no'

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow everything',
    },
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      no: 'No',
    },
  },
  defaultOptions: [],
  create: (context: Context): RuleListener => ({
    Program: () => {
      context.report({
        loc: { column: 0, line: 1 },
        messageId: 'no',
      })
    },
  }),
})
