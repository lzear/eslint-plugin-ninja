import { isCI } from 'std-env'

import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'

type MESSAGE_ID = 'noci'

type Options = [unknown]

export const RULE_NAME = 'no-ci'

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow running on CI lol',
    },
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      noci: 'No CI lol',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => ({
    Program: () => {
      if (isCI)
        context.report({
          messageId: 'noci',
          node: context.getSourceCode().ast,
        })
    },
  }),
})
