'use strict'

const isShorthandPropertyValue = (identifier: any) =>
  identifier.parent.type === 'Property' &&
  identifier.parent.shorthand &&
  identifier === identifier.parent.value

export default isShorthandPropertyValue
