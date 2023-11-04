import type { TSESTree } from '@typescript-eslint/types'

import type {
  RuleFix,
  RuleFixer,
  RuleListener,
  RuleContext,
} from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
import { getCommentBefore } from '../utils/get-comment-before.js'

type MESSAGE_ID = 'expectedJustification'

const MAX_LINE_LENGTH = 80
type Options = []

export const RULE_NAME = 'justify'
type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce comments explaining code',
    },
    fixable: 'code',
    schema: [{ type: 'object' }],
    messages: {
      expectedJustification: 'Expected justification for line `{{line}}`',
    },
  },
  defaultOptions: [],
  create: (context: Context): RuleListener => {
    const { sourceCode } = context
    const lines = new Set<number>()
    const explainNode = (node: TSESTree.Node) => {
      if (lines.has(node.loc.start.line)) return
      const comment = getCommentBefore(node, sourceCode)

      if (!comment) {
        lines.add(node.loc.start.line)
        const line = sourceCode.getText(node)
        const fix: ((fixer: RuleFixer) => RuleFix) | undefined = (
          fixer: RuleFixer,
        ) => fixer.insertTextBefore(node, '// TODO: explain next line\n')
        context.report({
          messageId: 'expectedJustification',
          node,
          fix,
          data: {
            line:
              line.length > MAX_LINE_LENGTH
                ? `${line.slice(0, MAX_LINE_LENGTH - 2)}...`
                : line,
          },
        })
      }
    }
    return {
      ArrowFunctionExpression: explainNode,
      AssignmentExpression: explainNode,
      CallExpression: explainNode,
      ExpressionStatement: explainNode,
      FunctionDeclaration: explainNode,
      IfStatement: explainNode,
      ThrowStatement: explainNode,
      VariableDeclaration: explainNode,
    }
  },
})
