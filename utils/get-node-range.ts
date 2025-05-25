import type { TSESTree } from '@typescript-eslint/types'
import type { TSESLint } from '@typescript-eslint/utils'

import { ASTUtils } from '@typescript-eslint/utils'

import type { PartitionComment } from '../typings/index'

import { isPartitionComment } from './is-partition-comment'
import { getCommentBefore } from './get-comment-before'

export const getNodeRange = (
  node: TSESTree.Node,
  sourceCode: TSESLint.SourceCode,
  additionalOptions?: {
    partitionComment?: PartitionComment
  },
): TSESTree.Range => {
  let start = node.range.at(0)!
  let end = node.range.at(1)!

  const raw = sourceCode.text.slice(start, end)

  // @ts-expect-error: error
  if (ASTUtils.isParenthesized(node, sourceCode)) {
    const bodyOpeningParen = sourceCode.getTokenBefore(
      // @ts-expect-error: error
      node,
      ASTUtils.isOpeningParenToken,
    )!

    const bodyClosingParen = sourceCode.getTokenAfter(
      // @ts-expect-error: error
      node,
      ASTUtils.isClosingParenToken,
    )!

    start = bodyOpeningParen.range.at(0)!
    end = bodyClosingParen.range.at(1)!
  }

  // @ts-expect-error
  const comment = getCommentBefore(node, sourceCode)

  if (raw.endsWith(';') || raw.endsWith(',')) {
    // @ts-expect-error: error
    const tokensAfter = sourceCode.getTokensAfter(node, {
      includeComments: true,
      count: 2,
    })

    if (node.loc.start.line === tokensAfter.at(1)?.loc.start.line) {
      end -= 1
    }
  }

  if (
    comment &&
    !isPartitionComment(
      additionalOptions?.partitionComment ?? false,
      comment.value,
    )
  ) {
    start = comment.range.at(0)!
  }

  return [start, end]
}
