import type { TSESTree } from '@typescript-eslint/types'

import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule'

import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'noxkcd'

type Options = [unknown]

export const RULE_NAME = 'no-xkcd'
type Context = RuleContext<MESSAGE_ID, Options>
const CHAR_LIMIT = 40

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow xkcd references',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      noxkcd:
        'xkcd references are overused. Please remove them. ({{ matchedTerm }}) {{ comment }}',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => {
    const noxkcdButFuckcars =
      /xkcd\.com\/(?!2832$|comics\/urban_planning_opinion_progression).*/i

    const checkComment = (node: TSESTree.Comment) => {
      const comment = node.value
      const matches = comment.match(noxkcdButFuckcars)
      for (const matchedTerm of matches || []) {
        let commentToDisplay = ''
        let truncated = false

        for (const c of comment.trim().split(/\s+/u)) {
          const tmp = commentToDisplay ? `${commentToDisplay} ${c}` : c

          if (tmp.length <= CHAR_LIMIT) {
            commentToDisplay = tmp
          } else {
            truncated = true
            break
          }
        }

        context.report({
          node,
          messageId: 'noxkcd',
          data: {
            matchedTerm,
            comment: `${commentToDisplay}${truncated ? '...' : ''}`,
          },
        })
      }
    }

    const sourceCode = context.getSourceCode()
    return {
      Program: () => {
        const comments = sourceCode.getAllComments()
        for (const node of comments) checkComment(node)
      },
    }
  },
})
