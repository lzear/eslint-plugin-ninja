import type { Difference } from 'prettier-linter-helpers'
import type { TSESTree } from '@typescript-eslint/types'

import { generateDifferences } from 'prettier-linter-helpers'
import _ from 'lodash'

import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
import { reportDifference } from '../utils/report-difference.js'
type MESSAGE_ID = 'delete' | 'insert' | 'replace'

type Options = [unknown]

export const RULE_NAME = 'justify2'
type Context = RuleContext<MESSAGE_ID, Options>

const splitNumberEvenly = (number: number, count: number) => {
  const baseValue = Math.floor(number / count)
  const remainder = number % count
  const result = Array.from({ length: count }).fill(baseValue) as number[]
  for (let i = 0; i < remainder; i++) result[i] += 1
  return result
}

const replacePortions = (
  input: string,
  replacements: {
    length: number
    start: number
    end: number
  }[],
) => {
  const r2 = [...replacements].sort((a, b) => b.start - a.start)
  let result = input
  for (const { start, end, length } of r2)
    result = result.slice(0, start) + ' '.repeat(length) + result.slice(end)
  return result
}

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce text to be justified',
    },
    fixable: 'code',
    schema: [{ type: 'object' }],
    messages: {
      insert: 'Justify. Insert `{{ insertText }}`',
      delete: 'Justify. Delete `{{ deleteText }}`',
      replace: 'Justify. Replace `{{ deleteText }}` with `{{ insertText }}`',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => {
    const { sourceCode } = context
    const { text, lines, tokensAndComments } = sourceCode

    const reportDiffs = (ugly: string, pretty: string) => {
      if (ugly !== pretty) {
        const differences: Difference[] = generateDifferences(ugly, pretty)
        for (const difference of differences)
          reportDifference(context, difference)
      }
    }

    return {
      Program: () => {
        let maxLen = 0
        const lll = text.split('\n')
        for (const line of lll) maxLen = Math.max(maxLen, line.trim().length)
        interface Arr {
          leftToken: TSESTree.Token
          line: number
          rightToken: TSESTree.Token
        }
        const arr: Arr[] = tokensAndComments
          .map((leftToken, leftIndex, tokens): Arr | undefined => {
            if (leftIndex === tokens.length - 1) {
              return undefined
            }
            const rightToken = tokens[leftIndex + 1]

            // Ignore tokens that don't have 2 spaces between them or are on different lines
            if (
              !text
                .slice(leftToken.range[1], rightToken.range[0])
                .includes(' ') ||
              leftToken.loc.end.line < rightToken.loc.start.line
            ) {
              return undefined
            }
            return {
              line: rightToken.loc.start.line,
              rightToken,
              leftToken,
            }
          })
          .filter(Boolean) as Arr[]

        const g = _.groupBy(arr, 'line')

        const newLines = lines.map((line, lineIndex) => {
          const sepInLine: Arr[] | undefined = g[lineIndex + 1]

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (!sepInLine) return line.trim()

          const spaces = sepInLine.map(
            s => s.rightToken.range[0] - s.leftToken.range[1],
          )
          const totalSpaces = _.sum(spaces)
          const newSpacesLenths = splitNumberEvenly(
            maxLen - (line.trim().length - totalSpaces),
            sepInLine.length,
          )

          return replacePortions(
            line,
            sepInLine.map((s, i) => ({
              start: s.leftToken.loc.end.column,
              end: s.rightToken.loc.start.column,
              length: newSpacesLenths[i],
            })),
          ).trim()
        })
        const goal = newLines.join('\n')
        reportDiffs(text, goal)
      },
    }
  },
})
