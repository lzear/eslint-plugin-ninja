/* eslint-disable */
import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule'
import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'no-avoidable-loop'

type Options = [unknown]

export const RULE_NAME = 'no-avoidable-loop'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow useless `for` loops',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      'no-avoidable-loop':
        'Avoid loops obfuscating of repeated operations. Check if you can repeat the body of the loop instead.',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => ({
    ForStatement: node =>
      context.report({ messageId: 'no-avoidable-loop', node }),
    ForOfStatement: node =>
      context.report({ messageId: 'no-avoidable-loop', node }),
    ForInStatement: node =>
      context.report({ messageId: 'no-avoidable-loop', node }),
    DoWhileStatement: node =>
      context.report({ messageId: 'no-avoidable-loop', node }),
    WhileStatement: node =>
      context.report({ messageId: 'no-avoidable-loop', node }),
  }),
})
