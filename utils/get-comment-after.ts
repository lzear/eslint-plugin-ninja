import type { TSESLint } from '@typescript-eslint/utils'
import type { TSESTree } from '@typescript-eslint/types'

export const getCommentAfter = (
  node: TSESTree.Node,
  source: TSESLint.SourceCode,
): TSESTree.Comment | null => {
  // @ts-expect-error:  error TS2345: Argument of type 'Node' is not assignable to parameter of type 'Node | Token'.
  const token = source.getTokenAfter(node, {
    filter: ({ value, type }) =>
      !(type === 'Punctuator' && [',', ';'].includes(value)),
    includeComments: true,
  })

  if (
    // @ts-expect-error: Type 'AccessorPropertyComputedName' is not assignable to type 'Node | Token'.
    (token?.type === 'Block' || token?.type === 'Line') &&
    // @ts-expect-error - idk
    node.loc.end.line === token.loc.end.line
  ) {
    return token
  }

  return null
}
