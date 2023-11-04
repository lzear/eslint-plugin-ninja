import type { PartitionComment } from '../typings/index.js'

import * as minimatchModule from '../node_modules/minimatch/dist/mjs/index.js'
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
