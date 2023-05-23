import type { TSESTree } from '@typescript-eslint/types'

import { AST_NODE_TYPES } from '@typescript-eslint/types'

import { createEslintRule } from '~/utils/create-eslint-rule'
import { rangeToDiff } from '~/utils/range-to-diff'
import { SortType, SortOrder } from '~/typings'
import { sortNodes } from '~/utils/sort-nodes'
import type { SortingNode } from '~/typings'
import { complete } from '~/utils/complete'
import { compare } from '~/utils/compare'

type MESSAGE_ID = 'unexpectedMapElementsOrder'

type Options = [
  Partial<{
    order: SortOrder
    type: SortType
  }>,
]

export const RULE_NAME = 'sort-map-elements'

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce sorted Map elements',
      recommended: false,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          type: {
            enum: [SortType.alphabetical, SortType.natural, SortType['line-length']],
            default: SortType.natural,
          },
          order: {
            enum: [SortOrder.asc, SortOrder.desc],
            default: SortOrder.asc,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unexpectedMapElementsOrder: 'Expected "{{second}}" to come before "{{first}}"',
    },
  },
  defaultOptions: [
    {
      type: SortType.alphabetical,
      order: SortOrder.asc,
    },
  ],
  create: context => ({
    NewExpression: node => {
      if (
        node.callee.type === AST_NODE_TYPES.Identifier &&
        node.callee.name === 'Map' &&
        node.arguments[0].type === AST_NODE_TYPES.ArrayExpression
      ) {
        let options = complete(context.options.at(0), {
          type: SortType.alphabetical,
          order: SortOrder.asc,
        })

        let [{ elements }] = node.arguments
        let source = context.getSourceCode().text

        if (elements.length > 1) {
          let parts: TSESTree.Expression[][] = elements.reduce(
            (accumulator: TSESTree.Expression[][], element: TSESTree.Expression | TSESTree.SpreadElement | null) => {
              if (element === null || element.type === AST_NODE_TYPES.SpreadElement) {
                accumulator.push([])
              } else {
                accumulator.at(-1)!.push(element)
              }
              return accumulator
            },
            [[]],
          )

          parts.forEach(part => {
            let values: SortingNode[] = part.map(element => {
              let name: string

              if (element.type === AST_NODE_TYPES.ArrayExpression) {
                let [first] = element.elements

                if (!first) {
                  name = `${first}`
                } else if (first.type === AST_NODE_TYPES.Literal) {
                  name = first.raw
                } else {
                  name = source.slice(...first.range)
                }
              } else {
                name = source.slice(...element.range)
              }

              return {
                size: rangeToDiff(element.range),
                node: element,
                name,
              }
            })

            for (let i = 1; i < values.length; i++) {
              let first = values.at(i - 1)!
              let second = values.at(i)!

              if (compare(first, second, options)) {
                context.report({
                  messageId: 'unexpectedMapElementsOrder',
                  data: {
                    first: first.name,
                    second: second.name,
                  },
                  node: second.node,
                  fix: fixer => {
                    let sourceCode = context.getSourceCode()
                    let { text } = sourceCode
                    return sortNodes(fixer, text, values, options)
                  },
                })
              }
            }
          })
        }
      }
    },
  }),
})