import type { Difference } from 'prettier-linter-helpers'

import { generateDifferences } from 'prettier-linter-helpers'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { Linter } from 'eslint'

import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
import { reportDifference } from '../utils/report-difference.js'
import { complete } from '../utils/complete.js'

type MESSAGE_ID = 'delete' | 'insert' | 'replace'

const enum Side {
  ltrIndent = 'ltrIndent',
  rtlIndent = 'rtlIndent',
  center = 'center',
  right = 'right',
  left = 'left',
}

type Options = [
  Partial<{
    side: Side
  }>,
]

export const RULE_NAME = 'align'
type Context = RuleContext<MESSAGE_ID, Options>

export const moveIndentToEnd = (str: string) =>
  str
    .split('\n')
    .map(line => {
      const leadingSpaces = line.match(/^\s+/)?.[0] ?? ''
      return line.trim() + leadingSpaces
    })
    .join('\n')

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce elegant text alignment',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          side: {
            enum: [
              Side.center,
              Side.right,
              Side.left,
              Side.rtlIndent,
              Side.ltrIndent,
            ],
            default: Side.center,
            type: 'string',
          },
        },
      },
    ],
    messages: {
      insert: 'Align `{{ side }}`. Insert `{{ insertText }}`',
      delete: 'Align `{{ side }}`. Delete `{{ deleteText }}`',
      replace:
        'Align `{{ side }}`. Replace `{{ deleteText }}` with `{{ insertText }}`',
    },
  },
  defaultOptions: [{ side: Side.center }],
  create: (context: Context): RuleListener => {
    const options = complete(context.options.at(0), {
      side: Side.center,
    })
    const { sourceCode } = context
    const { text } = sourceCode

    const processLine = (
      line: string,
      maxLen: number,
      shouldTrim: boolean,
      side: Side,
    ) => {
      const trimmed = shouldTrim ? line.trim() : line
      if (side === Side.left) return trimmed
      if (side === Side.right) return trimmed.padStart(maxLen)
      return trimmed.padStart(Math.round((maxLen + trimmed.length) / 2))
    }

    const reportDiffs = (ugly: string, pretty: string) => {
      if (ugly !== pretty) {
        const differences: Difference[] = generateDifferences(ugly, pretty)
        for (const difference of differences)
          reportDifference(context, difference, { side: options.side })
      }
    }

    const makeGoal = (code: string, shouldTrim: boolean, side: Side) => {
      let maxLen = 0
      const lll = code.split('\n')
      for (const line of lll)
        maxLen = Math.max(maxLen, (shouldTrim ? line.trim() : line).length)

      return lll
        .map(line => processLine(line, maxLen, shouldTrim, side))
        .join('\n')
    }
    const processCode = (code: string, shouldTrim: boolean, side: Side) => {
      const pretty = makeGoal(code, shouldTrim, side)
      reportDiffs(code, pretty)
    }

    const processRtlIndent = (rtl: boolean) => {
      const indent = builtinRules.get('indent')!
      const linter = new Linter()
      linter.defineRule('indent', indent)
      const { output } = linter.verifyAndFix(
        // lines.map(line => line.trim()).join('\n'),
        text,
        { rules: { indent: [2, 2] } },
        { filename: 'foo.ts' },
      )

      const pretty = rtl
        ? makeGoal(moveIndentToEnd(output), false, Side.right)
        : output
      reportDiffs(text, pretty)
    }

    return {
      Program: () => {
        if (options.side === Side.rtlIndent) return processRtlIndent(true)
        if (options.side === Side.ltrIndent) return processRtlIndent(false)
        return processCode(text, true, options.side)
      },
    }
  },
})
