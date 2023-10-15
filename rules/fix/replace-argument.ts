'use strict'
import { getParenthesizedRange } from '../utils/parentheses.js'

function replaceArgument(fixer, node, text, sourceCode) {
  return fixer.replaceTextRange(getParenthesizedRange(node, sourceCode), text)
}

export default replaceArgument
