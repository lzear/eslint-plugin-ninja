import type { RuleFixer } from '../utils/eslint-types/Rule'

import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'replace'

type Options = []

export const RULE_NAME = 'prefer-tab'

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: { description: 'require word separators to be tabs, not spaces' },
    fixable: 'whitespace',
    schema: [{ type: 'object' }],
    messages: {
      replace: 'Replace space by tab',
    },
  },
  defaultOptions: [],
  create: context => {
    const sourceCode = context.getSourceCode()
    return {
      Program: () => {
        const lines = sourceCode.lines || []
        let maxLength = 0
        for (const line of lines)
          maxLength = Math.max(maxLength, line.trim().length)

        const text = sourceCode.text || ''
        const tokensAndComments = sourceCode.tokensAndComments || []
        for (const [leftIndex, leftToken] of tokensAndComments.entries()) {
          if (leftIndex === tokensAndComments.length - 1) continue
          const rightToken = tokensAndComments[leftIndex + 1]

          const stringBetween = text.slice(
            leftToken.range[1],
            rightToken.range[0],
          )

          if (!/^\s*$/.test(stringBetween)) continue
          if (!/ /.test(stringBetween)) continue

          const replacedString = stringBetween.replaceAll(' ', '\t')

          context.report({
            node: rightToken,
            loc: { start: leftToken.loc.end, end: rightToken.loc.start },
            messageId: 'replace',
            fix: (fixer: RuleFixer) =>
              fixer.replaceTextRange(
                [leftToken.range[1], rightToken.range[0]],
                replacedString,
              ),
          })
        }
      },
    }
  },
})
