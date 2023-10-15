'use strict'
import { Scope } from '../../utils/eslint-types/Scope.js'

import getVariableIdentifiers from '../utils/get-variable-identifiers.js'

import replaceReferenceIdentifier from './replace-reference-identifier.js'
import { RuleFixer } from '../../utils/eslint-types/Rule.js'

const renameVariable = (
  variable: Scope.Variable,
  name: string,
  fixer: RuleFixer,
) =>
  getVariableIdentifiers(variable).map(identifier =>
    replaceReferenceIdentifier(identifier, name, fixer),
  )

export default renameVariable
