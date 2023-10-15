import type { SortingNode, SortOrder, SortType } from '../typings'

import { compare } from './compare'

export const sortNodes = <T extends SortingNode>(
  nodes: T[],
  options: {
    'ignore-case'?: boolean
    order: SortOrder
    type: SortType
  },
): T[] => [...nodes].sort((a, b) => compare(a, b, options))
