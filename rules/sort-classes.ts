import type { TSESLint } from '@typescript-eslint/utils'

import type { SortingNode } from '../typings'

import { createEslintRule } from '../utils/create-eslint-rule'
import { getGroupNumber } from '../utils/get-group-number'
import { getNodeRange } from '../utils/get-node-range'
import { toSingleLine } from '../utils/to-single-line'
import { rangeToDiff } from '../utils/range-to-diff'
import { isPositive } from '../utils/is-positive'
import { SortOrder, SortType } from '../typings'
import { useGroups } from '../utils/use-groups'
import { sortNodes } from '../utils/sort-nodes'
import { complete } from '../utils/complete'
import { pairwise } from '../utils/pairwise'
import { compare } from '../utils/compare'

type MESSAGE_ID = 'unexpectedClassesOrder'

type Group =
  | 'static-private-method'
  | 'private-property'
  | 'static-property'
  | 'index-signature'
  | 'private-method'
  | 'static-method'
  | 'constructor'
  | 'get-method'
  | 'set-method'
  | 'property'
  | 'unknown'
  | 'method'

type Options = [
  Partial<{
    groups: (Group[] | Group)[]
    'ignore-case': boolean
    order: SortOrder
    type: SortType
  }>,
]

export const RULE_NAME = 'sort-classes'

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce sorted classes',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          type: {
            enum: [
              SortType.alphabetical,
              SortType.natural,
              SortType['line-length'],
            ],
            default: SortType.alphabetical,
            type: 'string',
          },
          'ignore-case': {
            type: 'boolean',
            default: false,
          },
          order: {
            enum: [SortOrder.asc, SortOrder.desc],
            default: SortOrder.asc,
            type: 'string',
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
      unexpectedClassesOrder: 'Expected "{{right}}" to come before "{{left}}"',
    },
  },
  defaultOptions: [
    {
      type: SortType.alphabetical,
      order: SortOrder.asc,
    },
  ],
  create: context => ({
    ClassBody: node => {
      if (node.body.length > 1) {
        const options = complete(context.options.at(0), {
          type: SortType.alphabetical,
          order: SortOrder.asc,
          'ignore-case': false,
          groups: ['property', 'constructor', 'method', 'unknown'],
        })

        const source = context.getSourceCode()

        const nodes: SortingNode[] = node.body.map(member => {
          let name: string
          const { getGroup, defineGroup } = useGroups(options.groups)

          if (member.type === 'StaticBlock') {
            name = 'static'
          } else if (member.type === 'TSIndexSignature') {
            name = source.text.slice(
              member.range.at(0),
              member.typeAnnotation?.range.at(0) ?? member.range.at(1),
            )
          } else {
            if (member.key.type === 'Identifier') {
              ({ name } = member.key)
            } else {
              name = source.text.slice(...member.key.range)
            }
          }

          const isPrivate = name.startsWith('_') || name.startsWith('#')

          switch (member.type) {
            case 'MethodDefinition': {
              if (member.kind === 'constructor') {
                defineGroup('constructor')
              }

              const isPrivateMethod =
                member.accessibility === 'private' || isPrivate

              const isStaticMethod = member.static

              if (isPrivateMethod && isStaticMethod) {
                defineGroup('static-private-method')
              }

              if (isPrivateMethod) {
                defineGroup('private-method')
              }

              if (isStaticMethod) {
                defineGroup('static-method')
              }

              if (member.kind === 'get') {
                defineGroup('get-method')
              }

              if (member.kind === 'set') {
                defineGroup('set-method')
              }

              defineGroup('method')

              break
            }
            case 'TSIndexSignature': {
              defineGroup('index-signature')

              break
            }
            case 'PropertyDefinition': {
              if (member.accessibility === 'private' || isPrivate) {
                defineGroup('private-property')
              }

              if (member.static) {
                defineGroup('static-property')
              }

              defineGroup('property')

              break
            }
            // No default
          }

          return {
            size: rangeToDiff(member.range),
            group: getGroup(),
            node: member,
            name,
          }
        })

        pairwise(nodes, (left, right) => {
          const leftNum = getGroupNumber(options.groups, left)
          const rightNum = getGroupNumber(options.groups, right)

          if (
            left.name !== right.name &&
            (leftNum > rightNum ||
              (leftNum === rightNum &&
                isPositive(compare(left, right, options))))
          ) {
            context.report({
              messageId: 'unexpectedClassesOrder',
              data: {
                left: toSingleLine(left.name),
                right: toSingleLine(right.name),
              },
              node: right.node,
              fix: (fixer: TSESLint.RuleFixer) => {
                const fixes: TSESLint.RuleFix[] = []

                const grouped = nodes.reduce(
                  (
                    accumulator: {
                      [key: string]: SortingNode[]
                    },
                    sortingNode,
                  ) => {
                    const groupNum = getGroupNumber(options.groups, sortingNode)

                    accumulator[groupNum] =
                      groupNum in accumulator
                        ? sortNodes(
                            [...accumulator[groupNum], sortingNode],
                            options,
                          )
                        : [sortingNode]

                    return accumulator
                  },
                  {},
                )

                const formatted = Object.keys(grouped)
                  .sort()
                  .reduce(
                    (accumulator: SortingNode[], group: string) => [
                      ...accumulator,
                      ...grouped[group],
                    ],
                    [],
                  )

                for (let i = 0, max = formatted.length; i < max; i++) {
                  fixes.push(
                    fixer.replaceTextRange(
                      getNodeRange(nodes.at(i)!.node, source),
                      source.text.slice(
                        ...getNodeRange(formatted.at(i)!.node, source),
                      ),
                    ),
                  )
                }

                return fixes
              },
            })
          }
        })
      }
    },
  }),
})
