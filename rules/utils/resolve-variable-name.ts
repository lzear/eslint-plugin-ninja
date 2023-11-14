'use strict'

import { Scope } from '../../utils/eslint-types/Scope'

/**
Finds a variable named `name` in the scope `scope` (or it's parents).

@param {string} name - The variable name to be resolve.
@param {Scope} scope - The scope to look for the variable in.
@returns {Variable?} - The found variable, if any.
*/
export default (name: string, scope: Scope.Scope | null) => {
  while (scope) {
    const variable = scope.set.get(name)

    if (variable) {
      return variable
    }

    scope = scope.upper
  }
}
