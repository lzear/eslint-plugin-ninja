import type { TSESTree } from '@typescript-eslint/types'
import type { TSESLint } from '@typescript-eslint/utils'

import type { PartitionComment, SortingNode } from '../typings/index'

import { getCommentAfter } from './get-comment-after'
import { getNodeRange } from './get-node-range'

export const makeFixes = (
  fixer: TSESLint.RuleFixer,
  nodes: SortingNode[],
  sortedNodes: SortingNode[],
  source: TSESLint.SourceCode,
  additionalOptions?: {
    partitionComment?: PartitionComment
  },
) => {
  const fixes: TSESLint.RuleFix[] = []

  const isSingleline =
    nodes.at(0)?.node.loc.start.line === nodes.at(-1)?.node.loc.end.line

  for (let i = 0, max = nodes.length; i < max; i++) {
    const { node } = nodes.at(i)!

    fixes.push(
      fixer.replaceTextRange(
        getNodeRange(node, source, additionalOptions),
        source.text.slice(
          ...getNodeRange(sortedNodes.at(i)!.node, source, additionalOptions),
        ),
      ),
    )

    const commentAfter = getCommentAfter(sortedNodes.at(i)!.node, source)

    if (commentAfter && !isSingleline) {
      const tokenBefore = source.getTokenBefore(commentAfter)

      const range: TSESTree.Range = [
        tokenBefore!.range.at(1)!,
        commentAfter.range.at(1)!,
      ]

      fixes.push(fixer.replaceTextRange(range, ''))

      // @ts-expect-error: error
      const tokenAfterNode = source.getTokenAfter(node)

      fixes.push(
        fixer.insertTextAfter(
          // @ts-expect-error: error
          tokenAfterNode?.loc.end.line === node.loc.end.line
            ? tokenAfterNode
            : node,
          source.text.slice(...range),
        ),
      )
    }
  }

  return fixes
}
