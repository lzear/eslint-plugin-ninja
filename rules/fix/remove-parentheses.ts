'use strict'
import { getParentheses } from '../utils/parentheses.js'

function* removeParentheses(node, fixer, sourceCode) {
  const parentheses = getParentheses(node, sourceCode)
  for (const token of parentheses) {
    yield fixer.remove(token)
  }
}

export default removeParentheses
