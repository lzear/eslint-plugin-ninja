'use strict'
import type { TSESTree } from '@typescript-eslint/types'
import { isCallExpression } from './call-or-new-expression.js'

import { isStringLiteral } from './literal.js'

const isStaticRequire = node =>
  isCallExpression(node, {
    name: 'require',
    argumentsLength: 1,
    optional: false,
  }) && isStringLiteral(node.arguments[0])

export default isStaticRequire
