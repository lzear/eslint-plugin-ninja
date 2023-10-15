import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
import { isMethodCall } from './ast/is-method-call.js'

type Options = []

export const RULE_NAME = 'prefer-npm'

const messages = {
  'error/left-pad':
    'Prefer `left-pad` over `String#padStart()`. Import `left-pad` and replace.',
  'error/right-pad':
    'Prefer `right-pad` over `String#padEnd()`. Import `right-pad` and replace.',
  'error/is-odd': 'Prefer `is-odd` over `% 2`. Import `is-odd` and replace.',
  'error/is-is-odd':
    'Prefer `is-odd` over custom isOdd. Import `is-odd` from NPM.',
}

type MESSAGE_ID = keyof typeof messages

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: { description: 'require from npm instead of using JS builtins' },
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
  create: (context: Context): RuleListener => {
    const { sourceCode } = context
    return {
      FunctionDeclaration: node => {
        if (
          node.id &&
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          node.id.type === 'Identifier' &&
          /isodd/i.test(node.id.name)
        )
          context.report({ node, messageId: 'error/is-is-odd' })
      },
      VariableDeclarator: node => {
        if (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          node.id &&
          node.id.type === 'Identifier' &&
          node.id.name === 'isOdd' &&
          (node.init?.type === 'ArrowFunctionExpression' ||
            node.init?.type === 'FunctionExpression')
        )
          context.report({ node, messageId: 'error/is-is-odd' })
      },
      CallExpression: node => {
        if (
          isMethodCall(node, {
            method: 'padStart',
            optionalCall: false,
            optionalMember: false,
          })
        ) {
          const { callee, arguments: argz } = node
          // @ts-expect-error `callee.object`
          const fixed = `leftPad(${sourceCode.getText(callee.object)},${argz
            .map(arg => sourceCode.getText(arg))
            .join(', ')})`
          context.report({
            node,
            messageId: 'error/left-pad',
            fix: fixer => fixer.replaceText(node, fixed),
          })
        }
        if (
          isMethodCall(node, {
            method: 'padEnd',
            optionalCall: false,
            optionalMember: false,
          })
        ) {
          const { callee, arguments: argz } = node
          // @ts-expect-error `callee.object`
          const fixed = `rightPad(${sourceCode.getText(callee.object)},${argz
            .map(arg => sourceCode.getText(arg))
            .join(', ')})`
          context.report({
            node,
            messageId: 'error/right-pad',
            fix: fixer => fixer.replaceText(node, fixed),
          })
        }
      },
      BinaryExpression: node => {
        if (
          node.operator === '%' &&
          node.right.type === 'Literal' &&
          node.right.value === 2
        ) {
          const fixed = `isOdd(${sourceCode.getText(node.left)}, 2)`
          context.report({
            node,
            messageId: 'error/is-odd',
            fix: fixer => fixer.replaceText(node, fixed),
          })
        }
      },
    }
  },
})
