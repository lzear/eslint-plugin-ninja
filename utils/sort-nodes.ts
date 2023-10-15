import type { SortingNode, SortOrder, SortType } from '../typings/index.js'

import { compare } from './compare.js'

export const sortNodes = <T extends SortingNode>(
  nodes: T[],
  options: {
    'ignore-case'?: boolean
    order: SortOrder
    type: SortType
  },
): T[] => [...nodes].sort((a, b) => compare(a, b, options))
