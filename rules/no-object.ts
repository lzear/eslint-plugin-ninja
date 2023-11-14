import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'

type MESSAGE_ID = 'no-object'

type Options = [unknown]

export const RULE_NAME = 'no-object'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow object literals, prefer Map',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      'no-object': 'No object allowed',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => {
    const sourceCode = context.getSourceCode()
    return {
      ObjectExpression: node => {
        const { properties } = node
        let canFix = true
        const mapProps = properties
          .map(prop => {
            if (prop.type === 'SpreadElement') canFix = false
            if (prop.type === 'Property')
              return `["${sourceCode.getText(prop.key)}", ${sourceCode.getText(
                prop.value,
              )}]`
            return ''
          })
          .join(', ')

        context.report({
          node,
          messageId: 'no-object',
          fix:
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            canFix &&
            (fixer => fixer.replaceText(node, `new Map([${mapProps}])`)),
        })
      },
    }
  },
})
