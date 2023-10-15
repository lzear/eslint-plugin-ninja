'use strict'
import hasSameRange from './has-same-range.js'

const isShorthandImportLocal = (node: any) => {
  const { type, local, imported } = node.parent
  return (
    type === 'ImportSpecifier' &&
    hasSameRange(local, imported) &&
    local === node
  )
}

export default isShorthandImportLocal
