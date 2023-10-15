'use strict'

import { Scope } from '../../utils/eslint-types/Scope.js'

import getScopes from './get-scopes.js'

const getReferences = (scope: Scope.Scope) => [
  ...new Set(getScopes(scope).flatMap(({ references }) => references)),
]

export default getReferences
