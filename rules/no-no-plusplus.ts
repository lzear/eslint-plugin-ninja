import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'

type MESSAGE_ID = 'no-no-plusplus'

type Options = [unknown]

export const RULE_NAME = 'no-no-plusplus'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: { description: 'enforce the unary operators ++ and --' },
    fixable: 'code',
    schema: [{ type: 'object', properties: {} }],
    messages: {
      [RULE_NAME]: RULE_NAME,
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => ({
    AssignmentExpression: node => {
      const { right, left, operator } = node
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const sign1 = (operator === '+=' && 1) || (operator === '-=' && -1) || 0
      if (sign1 && right.type === 'Literal' && left.type === 'Identifier') {
        const rValue = right.value
        if (
          typeof rValue === 'number' &&
          Number.isInteger(rValue) &&
          (rValue === 1 || rValue === -1) &&
          Math.abs(rValue) < 1000
        ) {
          const sign2 = Math.sign(rValue)
          const r = Math.abs(rValue) - 1
          const sign = sign1 * sign2 < 0 ? '--' : '++'

          context.report({
            node,
            messageId: 'no-no-plusplus',
            fix: fixer => {
              const parenLeft = '('.repeat(r)
              const parenRight = `)${sign}`.repeat(r)
              return fixer.replaceText(
                node,
                `${parenLeft}${left.name}${sign}${parenRight}`,
              )
            },
          })
        }
      }
    },
  }),
})
