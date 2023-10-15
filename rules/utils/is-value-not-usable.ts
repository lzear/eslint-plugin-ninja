'use strict'

const { isExpressionStatement } = require('../ast/index.js')

export default node => isExpressionStatement(node.parent)
