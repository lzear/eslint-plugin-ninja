import * as minimatchModule from 'minimatch'

import type { PartitionComment } from '../typings'

const { minimatch } = minimatchModule

export const isPartitionComment = (
  partitionComment: PartitionComment,
  comment: string,
) =>
  (Array.isArray(partitionComment) &&
    partitionComment.some(pattern =>
      minimatch(comment.trim(), pattern, {
        nocomment: true,
      }),
    )) ||
  (typeof partitionComment === 'string' &&
    minimatch(comment.trim(), partitionComment, {
      nocomment: true,
    })) ||
  partitionComment === true
