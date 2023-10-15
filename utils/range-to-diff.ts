import type { TSESTree } from '@typescript-eslint/types'

export const rangeToDiff = (range: TSESTree.Range): number => {
  const [from, to] = range
  return to - from
}
