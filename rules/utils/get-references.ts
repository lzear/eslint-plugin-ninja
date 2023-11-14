'use strict'

import { Scope } from '../../utils/eslint-types/Scope'

import getScopes from './get-scopes'

const getReferences = (scope: Scope.Scope) => [
  ...new Set(getScopes(scope).flatMap(({ references }) => references)),
]

export default getReferences
