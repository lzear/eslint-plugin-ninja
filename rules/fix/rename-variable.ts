'use strict'
import { Scope } from '../../utils/eslint-types/Scope'

import getVariableIdentifiers from '../utils/get-variable-identifiers'

import replaceReferenceIdentifier from './replace-reference-identifier'
import { RuleFixer } from '../../utils/eslint-types/Rule'

const renameVariable = (
  variable: Scope.Variable,
  name: string,
  fixer: RuleFixer,
) =>
  getVariableIdentifiers(variable).map(identifier =>
    replaceReferenceIdentifier(identifier, name, fixer),
  )

export default renameVariable
