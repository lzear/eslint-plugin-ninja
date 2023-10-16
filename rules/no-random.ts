import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'

type Options = []

export const RULE_NAME = 'no-random'

const messages = {
  [RULE_NAME]:
    'Avoid using Math.random(). Use an actual random number instead.',
}

type MESSAGE_ID = keyof typeof messages

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: { description: 'disallow non-deterministic randomness' },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages,
  },
  defaultOptions: [],
  create: (context: Context): RuleListener => ({
    CallExpression: node => {
      if (
        node.type === 'CallExpression' &&
        node.callee.type === 'MemberExpression' &&
        // @ts-expect-error ...
        node.callee.object?.name === 'Math' &&
        // @ts-expect-error ...
        node.callee.property?.name === 'random'
      )
        context.report({
          node: node,
          messageId: RULE_NAME,
          fix: fixer => fixer.replaceText(node, String(Math.random())),
        })
    },
  }),
})
