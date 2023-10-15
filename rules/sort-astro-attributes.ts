import type { TSESTree } from '@typescript-eslint/types'
import type { AST } from 'astro-eslint-parser'

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

type Group<T extends string[]> =
  | 'astro-shorthand'
  | 'multiline'
  | 'shorthand'
  | 'unknown'
  | T[number]

type MESSAGE_ID = 'unexpectedAstroAttributesOrder'

type Options<T extends string[]> = [
  Partial<{
    'custom-groups': { [key in T[number]]: string[] | string }
    groups: (Group<T>[] | Group<T>)[]
    'ignore-case': boolean
    order: SortOrder
    type: SortType
  }>,
]

export const RULE_NAME = 'sort-astro-attributes'

export default createEslintRule<Options<string[]>, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce sorted Astro attributes',
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
          'ignore-case': {
            type: 'boolean',
            default: false,
          },
          groups: {
            type: 'array',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unexpectedAstroAttributesOrder:
        'Expected "{{right}}" to come before "{{left}}"',
    },
  },
  defaultOptions: [
    {
      type: SortType.alphabetical,
      order: SortOrder.asc,
    },
  ],
  // @ts-ignore
  create: context => {
    if (path.extname(context.getFilename()) !== '.astro') {
      return {}
    }

    return {
      JSXElement: (node: AST.JSXElement) => {
        const { attributes } = node.openingElement

        if (attributes.length > 1) {
          const options = complete(context.options.at(0), {
            type: SortType.alphabetical,
            order: SortOrder.asc,
            'ignore-case': false,
            'custom-groups': {},
            groups: [],
          })

          const source = context.getSourceCode()

          const parts: SortingNode[][] = attributes.reduce(
            (accumulator: SortingNode[][], attribute) => {
              if (attribute.type === 'JSXSpreadAttribute') {
                accumulator.push([])
                return accumulator
              }

              const name =
                typeof attribute.name.name === 'string'
                  ? attribute.name.name
                  : source.text.slice(...attribute.name.range)

              const { getGroup, defineGroup, setCustomGroups } = useGroups(
                options.groups,
              )

              setCustomGroups(options['custom-groups'], name)

              if (attribute.type === 'AstroShorthandAttribute') {
                defineGroup('astro-shorthand')
                defineGroup('shorthand')
              }

              if (attribute.value === null) {
                defineGroup('shorthand')
              }

              if (attribute.loc.start.line !== attribute.loc.end.line) {
                defineGroup('multiline')
              }

              accumulator.at(-1)!.push({
                size: rangeToDiff(attribute.range),
                node: attribute as unknown as TSESTree.Node,
                group: getGroup(),
                name,
              })

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
                  messageId: 'unexpectedAstroAttributesOrder',
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
