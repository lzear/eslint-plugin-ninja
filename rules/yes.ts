import type { RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
type MESSAGE_ID = 'yes'

type Options = []

export const RULE_NAME = 'yes'

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce nothing',
    },
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      yes: 'yes',
    },
  },
  defaultOptions: [],
  create: (): RuleListener => {
    return {}
  },
})
