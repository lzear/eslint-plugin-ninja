import type { SortingNode } from '../typings'

import { createEslintRule } from '../utils/create-eslint-rule'
import { getGroupNumber } from '../utils/get-group-number'
import { toSingleLine } from '../utils/to-single-line'
import { rangeToDiff } from '../utils/range-to-diff'
import { isPositive } from '../utils/is-positive'
import { SortOrder, SortType } from '../typings'
import { sortNodes } from '../utils/sort-nodes'
import { makeFixes } from '../utils/make-fixes'
import { useGroups } from '../utils/use-groups'
import { complete } from '../utils/complete'
import { pairwise } from '../utils/pairwise'
import { compare } from '../utils/compare'

type MESSAGE_ID = 'unexpectedObjectTypesOrder'

type Group<T extends string[]> = 'multiline' | 'unknown' | T[number]

type Options<T extends string[]> = [
  Partial<{
    groups: (Group<T>[] | Group<T>)[]
    'ignore-case': boolean
    'custom-groups': {}
    order: SortOrder
    type: SortType
  }>,
]

export const RULE_NAME = 'sort-object-types'

export default createEslintRule<Options<string[]>, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce sorted object types',
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
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unexpectedObjectTypesOrder:
        'Expected "{{right}}" to come before "{{left}}"',
    },
  },
  defaultOptions: [
    {
      type: SortType.alphabetical,
      order: SortOrder.asc,
    },
  ],
  create: context => ({
    TSTypeLiteral: node => {
      if (node.members.length > 1) {
        const options = complete(context.options.at(0), {
          type: SortType.alphabetical,
          'ignore-case': false,
          order: SortOrder.asc,
          'custom-groups': {},
          groups: [],
        })

        const source = context.getSourceCode()

        const nodes: SortingNode[] = node.members.map(member => {
          let name: string
          const raw = source.text.slice(member.range.at(0), member.range.at(1))

          const { getGroup, defineGroup, setCustomGroups } = useGroups(
            options.groups,
          )

          const formatName = (value: string): string =>
            value.replace(/(,|;)$/, '')

          if (member.type === 'TSPropertySignature') {
            if (member.key.type === 'Identifier') {
              ({ name } = member.key)
            } else if (member.key.type === 'Literal') {
              name = `${member.key.value}`
            } else {
              name = source.text.slice(
                member.range.at(0),
                member.typeAnnotation?.range.at(0),
              )
            }
          } else if (member.type === 'TSIndexSignature') {
            const endIndex: number =
              member.typeAnnotation?.range.at(0) ?? member.range.at(1)!

            name = formatName(source.text.slice(member.range.at(0), endIndex))
          } else {
            name = formatName(
              source.text.slice(member.range.at(0), member.range.at(1)),
            )
          }

          setCustomGroups(options['custom-groups'], name)

          if (member.loc.start.line !== member.loc.end.line) {
            defineGroup('multiline')
          }

          const endsWithComma = raw.endsWith(';') || raw.endsWith(',')
          const endSize = endsWithComma ? 1 : 0

          return {
            size: rangeToDiff(member.range) - endSize,
            group: getGroup(),
            node: member,
            name,
          }
        })

        pairwise(nodes, (left, right) => {
          const leftNum = getGroupNumber(options.groups, left)
          const rightNum = getGroupNumber(options.groups, right)

          if (
            leftNum > rightNum ||
            (leftNum === rightNum && isPositive(compare(left, right, options)))
          ) {
            context.report({
              messageId: 'unexpectedObjectTypesOrder',
              data: {
                left: toSingleLine(left.name),
                right: toSingleLine(right.name),
              },
              node: right.node,
              fix: fixer => {
                const grouped: {
                  [key: string]: SortingNode[]
                } = {}

                for (const currentNode of nodes) {
                  const groupNum = getGroupNumber(options.groups, currentNode)

                  grouped[groupNum] =
                    groupNum in grouped
                      ? sortNodes([...grouped[groupNum], currentNode], options)
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
    },
  }),
})
