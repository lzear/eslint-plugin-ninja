import type { TSESTree } from '@typescript-eslint/types'
import type { TSESLint } from '@typescript-eslint/utils'

import { builtinModules } from 'node:module'
import { minimatch } from 'minimatch'

import type { SortingNode } from '../typings'

import { getCommentBefore } from '../utils/get-comment-before'
import { createEslintRule } from '../utils/create-eslint-rule'
import { getGroupNumber } from '../utils/get-group-number'
import { getNodeRange } from '../utils/get-node-range'
import { rangeToDiff } from '../utils/range-to-diff'
import { isPositive } from '../utils/is-positive'
import { SortOrder, SortType } from '../typings'
import { useGroups } from '../utils/use-groups'
import { sortNodes } from '../utils/sort-nodes'
import { complete } from '../utils/complete'
import { pairwise } from '../utils/pairwise'
import { compare } from '../utils/compare'

type MESSAGE_ID =
  | 'missedSpacingBetweenImports'
  | 'extraSpacingBetweenImports'
  | 'unexpectedImportsOrder'

export enum NewlinesBetweenValue {
  'ignore' = 'ignore',
  'always' = 'always',
  'never' = 'never',
}

type Group<T extends string[]> =
  | 'external-type'
  | 'internal-type'
  | 'builtin-type'
  | 'sibling-type'
  | 'parent-type'
  | 'side-effect'
  | 'index-type'
  | 'internal'
  | 'external'
  | T[number]
  | 'sibling'
  | 'unknown'
  | 'builtin'
  | 'parent'
  | 'object'
  | 'index'
  | 'style'
  | 'type'

type Options<T extends string[]> = [
  Partial<{
    'custom-groups': {
      value?: { [key in T[number]]: string[] | string }
      type?: { [key in T[number]]: string[] | string }
    }
    'newlines-between': NewlinesBetweenValue
    groups: (Group<T>[] | Group<T>)[]
    'internal-pattern': string[]
    'ignore-case': boolean
    order: SortOrder
    type: SortType
  }>,
]

export const RULE_NAME = 'sort-imports'

type ModuleDeclaration =
  | TSESTree.TSImportEqualsDeclaration
  | TSESTree.ImportDeclaration

export default createEslintRule<Options<string[]>, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce sorted imports',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          'custom-groups': {
            type: 'object',
            properties: {
              type: {
                type: 'object',
              },
              value: {
                type: 'object',
              },
            },
            additionalProperties: false,
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
          'internal-pattern': {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          'newlines-between': {
            enum: [
              NewlinesBetweenValue.ignore,
              NewlinesBetweenValue.always,
              NewlinesBetweenValue.never,
            ],
            default: NewlinesBetweenValue.always,
            type: 'string',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unexpectedImportsOrder: 'Expected "{{right}}" to come before "{{left}}"',
      missedSpacingBetweenImports:
        'Missed spacing between "{{left}}" and "{{right}}" imports',
      extraSpacingBetweenImports:
        'Extra spacing between "{{left}}" and "{{right}}" imports',
    },
  },
  defaultOptions: [
    {
      type: SortType.alphabetical,
      order: SortOrder.asc,
    },
  ],
  create: context => {
    const options = complete(context.options.at(0), {
      'newlines-between': NewlinesBetweenValue.always,
      'custom-groups': { type: {}, value: {} },
      'internal-pattern': ['~/**'],
      type: SortType.alphabetical,
      order: SortOrder.asc,
      'ignore-case': false,
      groups: [],
    })

    let hasUnknownGroup = false

    for (let group of options.groups) {
      if (Array.isArray(group)) {
        for (let subGroup of group) {
          if (subGroup === 'unknown') {
            hasUnknownGroup = true
          }
        }
      } else {
        if (group === 'unknown') {
          hasUnknownGroup = true
        }
      }
    }

    if (!hasUnknownGroup) {
      options.groups = [...options.groups, 'unknown']
    }

    let source = context.getSourceCode()

    const nodes: SortingNode[] = []

    const isSideEffectImport = (node: TSESTree.Node) =>
      node.type === 'ImportDeclaration' && node.specifiers.length === 0

    const computeGroup = (node: ModuleDeclaration): Group<string[]> => {
      const isStyle = (value: string) =>
        ['.less', '.scss', '.sass', '.styl', '.pcss', '.css', '.sss'].some(
          extension => value.endsWith(extension),
        )

      const isIndex = (value: string) =>
        [
          './index.d.js',
          './index.d.ts',
          './index.js',
          './index.ts',
          './index',
          './',
          '.',
        ].includes(value)

      const isParent = (value: string) => value.indexOf('..') === 0

      const isSibling = (value: string) => value.indexOf('./') === 0

      const { getGroup, defineGroup, setCustomGroups } = useGroups(
        options.groups,
      )

      const isInternal = (nodeElement: TSESTree.ImportDeclaration) =>
        options['internal-pattern'].length &&
        options['internal-pattern'].some(pattern =>
          minimatch(nodeElement.source.value, pattern, {
            nocomment: true,
          }),
        )

      const isCoreModule = (value: string) => {
        const bunModules = [
          'bun',
          'bun:ffi',
          'bun:jsc',
          'bun:sqlite',
          'bun:test',
          'bun:wrap',
          'detect-libc',
          'undici',
          'ws',
        ]
        return (
          builtinModules.includes(
            value.startsWith('node:') ? value.split('node:')[1] : value,
          ) || bunModules.includes(value)
        )
      }

      let isExternal = (value: string) =>
        !(value.startsWith('.') || value.startsWith('/'))

      if (node.importKind === 'type') {
        if (node.type === 'ImportDeclaration') {
          setCustomGroups(options['custom-groups'].type, node.source.value)

          if (isIndex(node.source.value)) {
            defineGroup('index-type')
          }

          if (isSibling(node.source.value)) {
            defineGroup('sibling-type')
          }

          if (isParent(node.source.value)) {
            defineGroup('parent-type')
          }

          if (isInternal(node)) {
            defineGroup('internal-type')
          }

          if (isCoreModule(node.source.value)) {
            defineGroup('builtin-type')
          }

          if (isExternal(node.source.value)) {
            defineGroup('external-type')
          }
        }

        defineGroup('type')
      }

      if (node.type === 'ImportDeclaration') {
        setCustomGroups(options['custom-groups'].value, node.source.value)

        if (isSideEffectImport(node)) {
          defineGroup('side-effect')
        }

        if (isStyle(node.source.value)) {
          defineGroup('style')
        }

        if (isIndex(node.source.value)) {
          defineGroup('index')
        }

        if (isSibling(node.source.value)) {
          defineGroup('sibling')
        }

        if (isParent(node.source.value)) {
          defineGroup('parent')
        }

        if (isInternal(node)) {
          defineGroup('internal')
        }

        if (isCoreModule(node.source.value)) {
          defineGroup('builtin')
        }

        if (isExternal(node.source.value)) {
          defineGroup('external')
        }
      }

      return getGroup()
    }

    const registerNode = (node: ModuleDeclaration) => {
      let name: string

      if (node.type === 'ImportDeclaration') {
        name = node.source.value
      } else {
        name =
          node.moduleReference.type === 'TSExternalModuleReference' &&
          node.moduleReference.expression.type === 'Literal'
            ? `${node.moduleReference.expression.value}`
            : source.text.slice(...node.moduleReference.range)
      }

      nodes.push({
        size: rangeToDiff(node.range),
        group: computeGroup(node),
        name,
        node,
      })
    }

    return {
      TSImportEqualsDeclaration: registerNode,
      ImportDeclaration: registerNode,
      'Program:exit': () => {
        const hasContentBetweenNodes = (
          left: SortingNode,
          right: SortingNode,
        ): boolean =>
          source.getTokensBetween(
            left.node,
            getCommentBefore(right.node, source) || right.node,
            {
              includeComments: true,
            },
          ).length > 0

        const getLinesBetweenImports = (
          left: SortingNode,
          right: SortingNode,
        ) => {
          const linesBetweenImports = source.lines.slice(
            left.node.loc.end.line,
            right.node.loc.start.line - 1,
          )

          return linesBetweenImports.filter(line => line.trim().length === 0)
            .length
        }

        const fix = (
          fixer: TSESLint.RuleFixer,
          nodesToFix: SortingNode[],
        ): TSESLint.RuleFix[] => {
          const fixes: TSESLint.RuleFix[] = []

          const grouped: {
            [key: string]: SortingNode[]
          } = {}

          for (const node of nodesToFix) {
            const groupNum = getGroupNumber(options.groups, node)

            grouped[groupNum] =
              groupNum in grouped
                ? sortNodes([...grouped[groupNum], node], options)
                : [node]
          }

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
            const node = formatted.at(i)!

            fixes.push(
              fixer.replaceTextRange(
                getNodeRange(nodesToFix.at(i)!.node, source),
                source.text.slice(...getNodeRange(node.node, source)),
              ),
            )

            if (options['newlines-between'] !== 'ignore') {
              const nextNode = formatted.at(i + 1)

              if (nextNode) {
                const linesBetweenImports = getLinesBetweenImports(
                  nodesToFix.at(i)!,
                  nodesToFix.at(i + 1)!,
                )

                if (
                  (options['newlines-between'] === 'always' &&
                    getGroupNumber(options.groups, node) ===
                      getGroupNumber(options.groups, nextNode) &&
                    linesBetweenImports !== 0) ||
                  (options['newlines-between'] === 'never' &&
                    linesBetweenImports > 0)
                ) {
                  fixes.push(
                    fixer.removeRange([
                      getNodeRange(nodesToFix.at(i)!.node, source).at(1)!,
                      getNodeRange(nodesToFix.at(i + 1)!.node, source).at(0)! -
                        1,
                    ]),
                  )
                }

                if (
                  options['newlines-between'] === 'always' &&
                  getGroupNumber(options.groups, node) !==
                    getGroupNumber(options.groups, nextNode) &&
                  linesBetweenImports > 1
                ) {
                  fixes.push(
                    fixer.replaceTextRange(
                      [
                        getNodeRange(nodesToFix.at(i)!.node, source).at(1)!,
                        getNodeRange(nodesToFix.at(i + 1)!.node, source).at(
                          0,
                        )! - 1,
                      ],
                      '\n',
                    ),
                  )
                }

                if (
                  options['newlines-between'] === 'always' &&
                  getGroupNumber(options.groups, node) !==
                    getGroupNumber(options.groups, nextNode) &&
                  linesBetweenImports === 0
                ) {
                  fixes.push(
                    fixer.insertTextAfterRange(
                      getNodeRange(nodesToFix.at(i)!.node, source),
                      '\n',
                    ),
                  )
                }
              }
            }
          }

          return fixes
        }

        const splittedNodes: SortingNode[][] = [[]]

        for (const node of nodes) {
          const lastNode = splittedNodes.at(-1)?.at(-1)

          if (lastNode && hasContentBetweenNodes(lastNode, node)) {
            splittedNodes.push([node])
          } else {
            splittedNodes.at(-1)!.push(node)
          }
        }

        for (const nodeList of splittedNodes) {
          pairwise(nodeList, (left, right) => {
            const leftNum = getGroupNumber(options.groups, left)
            const rightNum = getGroupNumber(options.groups, right)

            const numberOfEmptyLinesBetween = getLinesBetweenImports(
              left,
              right,
            )

            if (
              !(
                isSideEffectImport(left.node) && isSideEffectImport(right.node)
              ) &&
              !hasContentBetweenNodes(left, right) &&
              (leftNum > rightNum ||
                (leftNum === rightNum &&
                  isPositive(compare(left, right, options))))
            ) {
              context.report({
                messageId: 'unexpectedImportsOrder',
                data: {
                  left: left.name,
                  right: right.name,
                },
                node: right.node,
                fix: fixer => fix(fixer, nodeList),
              })
            }

            if (
              options['newlines-between'] === 'never' &&
              numberOfEmptyLinesBetween > 0
            ) {
              context.report({
                messageId: 'extraSpacingBetweenImports',
                data: {
                  left: left.name,
                  right: right.name,
                },
                node: right.node,
                fix: fixer => fix(fixer, nodeList),
              })
            }

            if (options['newlines-between'] === 'always') {
              if (leftNum < rightNum && numberOfEmptyLinesBetween === 0) {
                context.report({
                  messageId: 'missedSpacingBetweenImports',
                  data: {
                    left: left.name,
                    right: right.name,
                  },
                  node: right.node,
                  fix: fixer => fix(fixer, nodeList),
                })
              } else if (
                numberOfEmptyLinesBetween > 1 ||
                (leftNum === rightNum && numberOfEmptyLinesBetween > 0)
              ) {
                context.report({
                  messageId: 'extraSpacingBetweenImports',
                  data: {
                    left: left.name,
                    right: right.name,
                  },
                  node: right.node,
                  fix: fixer => fix(fixer, nodeList),
                })
              }
            }
          })
        }
      },
    }
  },
})
