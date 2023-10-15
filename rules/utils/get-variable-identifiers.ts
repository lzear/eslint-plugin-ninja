import { Scope } from '../../utils/eslint-types/Scope.js'

const getVariableIdentifiers = ({
  identifiers,
  references,
}: Scope.Variable) => [
  ...new Set([
    ...identifiers,
    ...references.map(({ identifier }) => identifier),
  ]),
]

export default getVariableIdentifiers
