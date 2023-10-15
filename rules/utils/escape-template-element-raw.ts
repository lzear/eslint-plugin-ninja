'use strict'

export default string =>
  string.replaceAll(
    /(?<=(?:^|[^\\])(?:\\\\)*)(?<symbol>(?:`|\$(?={)))/g,
    '\\$<symbol>',
  )
