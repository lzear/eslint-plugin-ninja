import type { TSESTree } from '@typescript-eslint/types'

import path from 'node:path'

import type { SortingNode } from '../typings'

import { createEslintRule } from '../utils/create-eslint-rule'
import { getGroupNumber } from '../utils/get-group-number'
import { rangeToDiff } from '../utils/range-to-diff'
import { isPositive } from '../utils/is-positive'
import { SortOrder, SortType } from '../typings'
import { useGroups } from '../utils/use-groups'
import { makeFixes } from '../utils/make-fixes'
import { sortNodes } from '../utils/sort-nodes'
import { pairwise } from '../utils/pairwise'
import { complete } from '../utils/complete'
import { compare } from '../utils/compare'

type MESSAGE_ID = 'unexpectedJSXPropsOrder'

type Group<T extends string[]> =
  | 'multiline'
  | 'shorthand'
  | 'unknown'
  | T[number]

type Options<T extends string[]> = [
  Partial<{
    'custom-groups': { [key in T[number]]: string[] | string }
    groups: (Group<T>[] | Group<T>)[]
    'ignore-case': boolean
    order: SortOrder
    type: SortType
  }>,
]

export const RULE_NAME = 'sort-jsx-props'

export default createEslintRule<Options<string[]>, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce sorted JSX props',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          'custom-groups': {
            type: 'object',
          },
          type: {
            enum: [
              SortType.alphabetical,
              SortType.natural,
              SortType['line-length'],
            ],
            default: SortType.alphabetical,
            type: 'string',
          },
          order: {
            enum: [SortOrder.asc, SortOrder.desc],
            default: SortOrder.asc,
            type: 'string',
          },
          groups: {
            type: 'array',
          },
          'ignore-case': {
            type: 'boolean',
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unexpectedJSXPropsOrder: 'Expected "{{right}}" to come before "{{left}}"',
    },
  },
  defaultOptions: [
    {
      type: SortType.alphabetical,
      order: SortOrder.asc,
    },
  ],
  create: context => {
    if (
      ['.svelte', '.astro', '.vue'].includes(
        path.extname(context.getFilename()),
      )
    ) {
      return {}
    }
    return {
      JSXElement: node => {
        if (node.openingElement.attributes.length > 1) {
          const options = complete(context.options.at(0), {
            type: SortType.alphabetical,
            'ignore-case': false,
            order: SortOrder.asc,
            'custom-groups': {},
            groups: [],
          })

          const source = context.getSourceCode()

          const parts: SortingNode[][] = node.openingElement.attributes.reduce(
            (
              accumulator: SortingNode[][],
              attribute: TSESTree.JSXSpreadAttribute | TSESTree.JSXAttribute,
            ) => {
              if (attribute.type === 'JSXSpreadAttribute') {
                accumulator.push([])
                return accumulator
              }

              const name =
                attribute.name.type === 'JSXNamespacedName'
                  ? `${attribute.name.namespace.name}:${attribute.name.name.name}`
                  : attribute.name.name

              const { getGroup, defineGroup, setCustomGroups } = useGroups(
                options.groups,
              )

              setCustomGroups(options['custom-groups'], name)

              if (attribute.value === null) {
                defineGroup('shorthand')
              }

              if (attribute.loc.start.line !== attribute.loc.end.line) {
                defineGroup('multiline')
              }

              const jsxNode = {
                size: rangeToDiff(attribute.range),
                group: getGroup(),
                node: attribute,
                name,
              }

              accumulator.at(-1)!.push(jsxNode)

              return accumulator
            },
            [[]],
          )

          for (const nodes of parts) {
            pairwise(nodes, (left, right) => {
              const leftNum = getGroupNumber(options.groups, left)
              const rightNum = getGroupNumber(options.groups, right)

              if (
                leftNum > rightNum ||
                (leftNum === rightNum &&
                  isPositive(compare(left, right, options)))
              ) {
                context.report({
                  messageId: 'unexpectedJSXPropsOrder',
                  data: {
                    left: left.name,
                    right: right.name,
                  },
                  node: right.node,
                  fix: fixer => {
                    const grouped: {
                      [key: string]: SortingNode[]
                    } = {}

                    for (const currentNode of nodes) {
                      const groupNum = getGroupNumber(
                        options.groups,
                        currentNode,
                      )

                      grouped[groupNum] =
                        groupNum in grouped
                          ? sortNodes(
                              [...grouped[groupNum], currentNode],
                              options,
                            )
                          : [currentNode]
                    }

                    const sortedNodes: SortingNode[] = []

                    for (const group of Object.keys(grouped).sort()) {
                      sortedNodes.push(...sortNodes(grouped[group], options))
                    }

                    return makeFixes(fixer, nodes, sortedNodes, source)
                  },
                })
              }
            })
          }
        }
      },
    }
  },
})
