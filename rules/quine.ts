import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule'

import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'not a quine'

type Options = []

export const RULE_NAME = 'quine'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce quine',
    },
    schema: [{ type: 'object' }],
    messages: {
      'not a quine': 'not a quine',
    },
  },
  defaultOptions: [],
  create: (context: Context): RuleListener => {
    const sourceCode = context.getSourceCode()
    const text = sourceCode?.text || ''
    const processCode = (code: string) => {
      // eslint-disable-next-line no-eval
      const evalResult = eval(code)
      if (code !== evalResult)
        context.report({
          messageId: 'not a quine',
          loc: { column: 0, line: 1 },
        })
    }
    return { Program: () => processCode(text) }
  },
})
