import { Scope } from '../../utils/eslint-types/Scope'

/**
Gather a list of all Scopes starting recursively from the input Scope.

@param {Scope} scope - The Scope to start checking from.
@returns {Scope[]} - The resulting Scopes.
*/
const getScopes = (scope: Scope.Scope): Scope.Scope[] => [
  scope,
  ...scope.childScopes.flatMap(scope => getScopes(scope)),
]

export default getScopes
