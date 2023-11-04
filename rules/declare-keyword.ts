import type { TSESTree } from '@typescript-eslint/types'

import type { RuleContext } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
import { complete } from '../utils/complete.js'

type MESSAGE_ID = 'satisfyRegex'

type Options = [
  {
    type: 'start' | 'end' | 'natural'
    oneLetter: boolean
  },
]

export const RULE_NAME = 'declare-keyword'

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce variable names to include their type',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          side: {
            type: 'string',
            enum: ['start', 'end', 'natural'],
          },
          oneLetter: {
            type: 'boolean',
          },
        },
      },
    ],
    messages: {
      satisfyRegex:
        '`{{kind}} {{name}}` must {{startOrEnd}} with `{{keyword}}`',
    },
  },
  defaultOptions: [
    {
      type: 'natural',
      oneLetter: false,
    },
  ],
  create: (context: Context) => {
    const { type, oneLetter } = complete(context.options.at(0), {
      type: 'natural',
      oneLetter: false,
    })

    const check = (
      node:
        | TSESTree.VariableDeclarator
        | TSESTree.FunctionDeclaration
        | TSESTree.TSInterfaceDeclaration
        | TSESTree.TSEnumDeclaration
        | TSESTree.ClassDeclaration,
      naturalSide: 'start' | 'end',
      kind: string,
    ) => {
      const side = type === 'start' || type === 'end' ? type : naturalSide
      if (!('id' in node) || !node.id || !('name' in node.id)) return

      const { id } = node
      const { name } = id
      const keyword = oneLetter ? kind.charAt(0) : kind

      if (side === 'start' && !name.toLowerCase().startsWith(keyword)) {
        if (!node.id) return
        context.report({
          node,
          messageId: 'satisfyRegex',
          data: { kind, name, keyword, startOrEnd: 'start' },
          fix: fixer =>
            fixer.replaceText(
              id,
              `${keyword}${id.name.charAt(0).toUpperCase()}${id.name.slice(1)}`,
            ),
        })
      }

      if (side === 'end' && !node.id.name.toLowerCase().endsWith(keyword)) {
        if (!node.id) return
        context.report({
          node,
          messageId: 'satisfyRegex',
          data: { kind, name, keyword, startOrEnd: 'end' },
          fix: fixer =>
            fixer.replaceText(
              id,
              `${id.name}${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}`,
            ),
        })
      }
    }

    return {
      VariableDeclarator: node => {
        if (!('kind' in node.parent)) return
        const { kind } = node.parent
        check(node, 'start', kind)
      },

      FunctionDeclaration: node => {
        check(node, 'start', 'function')
      },
      TSInterfaceDeclaration: node => {
        check(node, 'start', 'interface')
      },
      TSEnumDeclaration: node => {
        check(node, 'start', 'enum')
      },
      ClassDeclaration: node => {
        const kind = oneLetter ? 'klass' : 'class'
        check(node, 'start', kind)
      },
    }
  },
})
