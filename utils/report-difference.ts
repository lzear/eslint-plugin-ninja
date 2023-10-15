import type { Difference } from 'prettier-linter-helpers'

import { showInvisibles } from 'prettier-linter-helpers'

import type { RuleContext } from './eslint-types/Rule.js'

export interface Diff {
  deleteText: string
  insertText: string
  offset: number
  operation: 'delete' | 'insert' | 'replace'
}

export const reportDifference = <O extends readonly unknown[]>(
  context: RuleContext<'delete' | 'insert' | 'replace', O>,
  difference: Difference,
  extraData: Record<string, string> = {},
) => {
  const { deleteText = '', insertText = '', offset, operation } = difference
  const range = /** @type {Range} */ [
    offset,
    offset + deleteText.length,
  ] as const
  const [start, end] = range.map(index =>
    context.getSourceCode().getLocFromIndex(index),
  )

  context.report({
    data: {
      deleteText: showInvisibles(deleteText),
      insertText: showInvisibles(insertText),
      ...extraData,
    },
    fix: fixer => fixer.replaceTextRange(range, insertText),
    loc: { end, start },
    messageId: operation,
  })
}
