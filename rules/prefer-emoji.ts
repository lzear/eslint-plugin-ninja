import type { TSESTree } from '@typescript-eslint/types'

// eslint-disable-next-line
import hasEmoji from 'has-emoji'
import path from 'node:path'

import type {
  ReportDescriptor,
  RuleContext,
  RuleListener,
} from '../utils/eslint-types/Rule'
import type { JSONSchema4 } from '../utils/eslint-types/json-schema'
import type { Scope } from '../utils/eslint-types/Scope'

import isShorthandPropertyValue from './utils/is-shorthand-property-value'
import isShorthandImportLocal from './utils/is-shorthand-import-local'
import getVariableIdentifiers from './utils/get-variable-identifiers'
import { createEslintRule } from '../utils/create-eslint-rule'
import renameVariable from './fix/rename-variable'
import avoidCapture from './utils/avoid-capture'
import { complete } from '../utils/complete'
import { emojis } from '../utils/emoji-list'
import getScopes from './utils/get-scopes'

const MESSAGE_ID_REPLACE = 'replace'
const MESSAGE_ID_SUGGESTION = 'suggestion'
const anotherNameMessage = 'A more descriptive emoji will do too.'
const messages = {
  [MESSAGE_ID_REPLACE]: `The {{nameTypeText}} \`{{discouragedName}}\` should be named \`{{replacement}}\`. ${anotherNameMessage}`,
  [MESSAGE_ID_SUGGESTION]: `Please rename the {{nameTypeText}} \`{{discouragedName}}\`. Suggested names are: {{replacementsText}}. ${anotherNameMessage}`,
}

const defaultOptions = {
  checkProperties: true,
  checkVariables: false,
  checkFilenames: true,
  checkDefaultAndNamespaceImports: false,
  checkShorthandImports: false,
  checkShorthandProperties: true,
  ignore: [],
  replacements: {},
}

const generateHash = (string_: string) => {
  let hash = 0
  for (let index = 0; index < string_.length; index++) {
    const char = string_.codePointAt(index)
    hash = (hash << 5) - hash + (char ?? 1)
    hash = Math.trunc(hash) // Convert to 32bit integer
  }
  return hash
}

const getElementBasedOnHash = (array: string[], string_: string) => {
  const hash = generateHash(string_)
  const abs = Math.abs(hash)
  return [
    array[abs % array.length],
    array[(abs + 1) % array.length],
    array[(abs + 2) % array.length],
  ]
}

interface NamedReplacements {
  name?: string
  replacements?: string[]
  samples?: string[]
  total: number
}

const getNameReplacements = (
  name: string,
  options: { ignore?: (RegExp | string)[] },
): NamedReplacements => {
  if (options.ignore?.some(regexp => new RegExp(regexp).test(name))) {
    return { total: 0 }
  }
  return hasEmoji(name)
    ? { total: 0 }
    : { total: 3, samples: getElementBasedOnHash(emojis, name) }
}

const getMessage = (
  discouragedName: string,
  replacements: NamedReplacements,
  nameTypeText: 'filename' | 'property' | 'variable',
): Omit<ReportDescriptor<MESSAGE_ID>, 'node'> => {
  const { total, samples = [] } = replacements
  if (total > 0) {
    return {
      messageId: MESSAGE_ID_REPLACE,
      data: {
        nameTypeText,
        discouragedName,
        replacement: samples[0],
      },
    }
  }

  let replacementsText = samples
    .map(replacement => `\`${replacement}\``)
    .join(', ')

  const omittedReplacementsCount = total - samples.length
  if (omittedReplacementsCount > 0) {
    replacementsText += `, ... (${
      omittedReplacementsCount > 99 ? '99+' : omittedReplacementsCount
    } more omitted)`
  }

  return {
    messageId: MESSAGE_ID_SUGGESTION,
    data: {
      nameTypeText,
      discouragedName,
      replacementsText,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isExportedIdentifier = (identifier: any) => {
  if (
    identifier.parent.type === 'VariableDeclarator' &&
    identifier.parent.id === identifier
  ) {
    return (
      identifier.parent.parent.type === 'VariableDeclaration' &&
      identifier.parent.parent.parent.type === 'ExportNamedDeclaration'
    )
  }

  if (
    identifier.parent.type === 'FunctionDeclaration' &&
    identifier.parent.id === identifier
  ) {
    return identifier.parent.parent.type === 'ExportNamedDeclaration'
  }

  if (
    identifier.parent.type === 'ClassDeclaration' &&
    identifier.parent.id === identifier
  ) {
    return identifier.parent.parent.type === 'ExportNamedDeclaration'
  }

  if (
    identifier.parent.type === 'TSTypeAliasDeclaration' &&
    identifier.parent.id === identifier
  ) {
    return identifier.parent.parent.type === 'ExportNamedDeclaration'
  }

  return false
}

const shouldFix = (variable: Scope.Variable) =>
  getVariableIdentifiers(variable).every(
    identifier =>
      !isExportedIdentifier(identifier) &&
      // In typescript parser, only `JSXOpeningElement` is added to variable
      // `<foo></foo>` -> `<bar></foo>` will cause parse error
      identifier.type !== 'JSXIdentifier',
  )

const isDefaultOrNamespaceImportName = (identifier: TSESTree.Identifier) => {
  if (
    identifier.parent.type === 'ImportDefaultSpecifier' &&
    identifier.parent.local === identifier
  ) {
    return true
  }

  if (
    identifier.parent.type === 'ImportNamespaceSpecifier' &&
    identifier.parent.local === identifier
  ) {
    return true
  }

  if (
    identifier.parent.type === 'ImportSpecifier' &&
    identifier.parent.local === identifier &&
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    identifier.parent.imported.type === 'Identifier' &&
    identifier.parent.imported.name === 'default'
  ) {
    return true
  }

  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  if (
    identifier.parent.type === 'VariableDeclarator' &&
    identifier.parent.id === identifier
  ) {
    return true
  }

  return false
}

const isClassVariable = (variable: Scope.Variable) => {
  if (variable.defs.length !== 1) return false

  const [definition] = variable.defs

  return definition.type === 'ClassName'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shouldReportIdentifierAsProperty = (identifier: TSESTree.Identifier) => {
  if (
    identifier.parent.type === 'MemberExpression' &&
    identifier.parent.property === identifier &&
    !identifier.parent.computed &&
    identifier.parent.parent.type === 'AssignmentExpression' &&
    identifier.parent.parent.left === identifier.parent
  ) {
    return true
  }

  if (
    identifier.parent.type === 'Property' &&
    identifier.parent.key === identifier &&
    !identifier.parent.computed &&
    !identifier.parent.shorthand && // Shorthand properties are reported and fixed as variables
    identifier.parent.parent.type === 'ObjectExpression'
  ) {
    return true
  }

  if (
    identifier.parent.type === 'ExportSpecifier' &&
    identifier.parent.exported === identifier &&
    identifier.parent.local !== identifier // Same as shorthand properties above
  ) {
    return true
  }

  return (
    (identifier.parent.type === 'MethodDefinition' ||
      identifier.parent.type === 'PropertyDefinition') &&
    identifier.parent.key === identifier &&
    !identifier.parent.computed
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isInternalImport = (node: any) => {
  let source = ''

  if (node.type === 'Variable') {
    source = node.node.init.arguments[0].value
  } else if (node.type === 'ImportBinding') {
    source = node.parent.source.value
  }

  return (
    !source.includes('node_modules') &&
    (source.startsWith('.') || source.startsWith('/'))
  )
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = (context: RuleContext<MESSAGE_ID, Options>): RuleListener => {
  const options = complete(context.options.at(0), defaultOptions)
  const filenameWithExtension = context.physicalFilename
  // A `class` declaration produces two variables in two scopes:
  // the inner class scope, and the outer one (wherever the class is declared).
  // This map holds the outer ones to be later processed when the inner one is encountered.
  // For why this is not a eslint issue see https://github.com/eslint/eslint-scope/issues/48#issuecomment-464358754
  const identifierToOuterClassVariable = new WeakMap()

  const checkPossiblyWeirdClassVariable = (variable: Scope.Variable) => {
    if (isClassVariable(variable)) {
      if (variable.scope.type === 'class') {
        // The inner class variable
        const [definition] = variable.defs
        const outerClassVariable = identifierToOuterClassVariable.get(
          definition.name,
        )

        if (!outerClassVariable) {
          return checkVariable(variable)
        }

        // Create a normal-looking variable (like a `var` or a `function`)
        // For which a single `variable` holds all references, unlike with a `class`
        const combinedReferencesVariable = {
          name: variable.name,
          scope: variable.scope,
          defs: variable.defs,
          identifiers: variable.identifiers,
          references: [
            ...variable.references,
            ...outerClassVariable.references,
          ],
        }

        // Call the common checker with the newly forged normalized class variable
        // @ts-expect-error ...
        return checkVariable(combinedReferencesVariable)
      }

      // The outer class variable, we save it for later, when it's inner counterpart is encountered
      const [definition] = variable.defs
      identifierToOuterClassVariable.set(definition.name, variable)

      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined
    }

    return checkVariable(variable)
  }

  // Holds a map from a `Scope` to a `Set` of new variable names generated by our fixer.
  // Used to avoid generating duplicate names, see for instance `let errCb, errorCb` test.
  const scopeToNamesGeneratedByFixer = new WeakMap()
  const isSafeName = (name: string, scopes: Scope.Scope[]) =>
    scopes.every(scope => {
      const generatedNames = scopeToNamesGeneratedByFixer.get(scope)
      return !generatedNames?.has(name)
    })
  // eslint-disable-next-line sonarjs/cognitive-complexity
  const checkVariable = (variable: Scope.Variable) => {
    if (variable.defs.length === 0) {
      return
    }

    const [definition] = variable.defs

    if (
      isDefaultOrNamespaceImportName(definition.name as TSESTree.Identifier)
    ) {
      if (!options.checkDefaultAndNamespaceImports) {
        return
      }
      if (
        options.checkDefaultAndNamespaceImports === 'internal' &&
        !isInternalImport(definition)
      ) {
        return
      }
    }
    if (isShorthandImportLocal(definition.name)) {
      if (!options.checkShorthandImports) {
        return
      }

      if (
        options.checkShorthandImports === 'internal' &&
        !isInternalImport(definition)
      ) {
        return
      }
    }

    if (
      !options.checkShorthandProperties &&
      isShorthandPropertyValue(definition.name)
    ) {
      return
    }

    const variableReplacements = getNameReplacements(variable.name, options)

    if (variableReplacements.total === 0) {
      return
    }

    const scopes = [
      ...variable.references.map(reference => reference.from),
      variable.scope,
    ]

    const safeVariableReplacements = {
      ...variableReplacements,
      samples: variableReplacements.samples
        ?.map(name => avoidCapture(name, scopes, isSafeName))
        .filter(Boolean) as string[] | undefined,
    }

    const problem = {
      // @ts-expect-error ...
      ...getMessage(definition.name.name, safeVariableReplacements, 'variable'),
      node: definition.name,
    }

    const replacement = safeVariableReplacements.samples?.[0]

    if (
      // variableReplacements.total === 1
      variableReplacements.total > 0 &&
      shouldFix(variable) &&
      replacement
    ) {
      for (const scope of scopes) {
        if (!scopeToNamesGeneratedByFixer.has(scope)) {
          scopeToNamesGeneratedByFixer.set(scope, new Set())
        }

        const generatedNames = scopeToNamesGeneratedByFixer.get(scope)
        generatedNames.add(replacement)
      }

      problem.fix = fixer => renameVariable(variable, replacement, fixer)
    }

    context.report(problem)
  }

  const checkVariables = (scope: Scope.Scope) => {
    for (const variable of scope.variables) {
      checkPossiblyWeirdClassVariable(variable)
    }
  }
  const checkScope = (scope: Scope.Scope) => {
    const scopes = getScopes(scope)
    for (const s of scopes) {
      checkVariables(s)
    }
  }

  return {
    Identifier: (node: TSESTree.Identifier) => {
      if (!options.checkProperties) {
        return
      }
      if (node.name === '__proto__') {
        return
      }
      const identifierReplacements = getNameReplacements(node.name, options)

      if (identifierReplacements.total === 0) {
        return
      }
      if (!shouldReportIdentifierAsProperty(node)) {
        return
      }
      const problem: ReportDescriptor<MESSAGE_ID> = {
        ...getMessage(node.name, identifierReplacements, 'property'),
        node,
      }

      context.report(problem)
    },

    Program: node => {
      if (!options.checkFilenames) {
        return
      }

      const filename =
        filenameWithExtension && path.basename(filenameWithExtension)
      const extension = filename && path.extname(filename)
      const filenameReplacements =
        filename &&
        getNameReplacements(path.basename(filename, extension), options)

      if (!filenameReplacements || filenameReplacements.total === 0) {
        return
      }
      filenameReplacements.samples = filenameReplacements.samples?.map(
        replacement => `${replacement}${extension}`,
      )

      context.report({
        ...getMessage(filename, filenameReplacements, 'filename'),
        node,
      })
    },

    'Program:exit': () => {
      if (!options.checkVariables) {
        return
      }

      const scopre = context.getScope()
      checkScope(scopre)
    },
  }
}

const schema: JSONSchema4 = {
  type: 'array',
  items: [
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        checkProperties: { type: 'boolean' },
        checkVariables: { type: 'boolean' },
        checkFilenames: { type: 'boolean' },
        checkDefaultAndNamespaceImports: {
          type: ['boolean', 'string'],
          pattern: 'internal',
        },
        checkShorthandImports: {
          type: ['boolean', 'string'],
          pattern: 'internal',
        },
        checkShorthandProperties: { type: 'boolean' },
        replacements: { type: 'object' },
        ignore: { type: 'array', uniqueItems: true },
      },
    },
  ],
}

type MESSAGE_ID = typeof MESSAGE_ID_REPLACE | typeof MESSAGE_ID_SUGGESTION

type Options = [
  Partial<{
    checkDefaultAndNamespaceImports: boolean | string
    checkShorthandImports: boolean | string
    replacements: Record<string, string[]>
    checkShorthandProperties: boolean
    ignore: (RegExp | string)[]
    checkProperties: boolean
    checkFilenames: boolean
    checkVariables: boolean
  }>,
]

export const RULE_NAME = 'prefer-emoji'

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  create,
  defaultOptions: [defaultOptions],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'require variables and properties to be named using emojis',
    },
    fixable: 'code',
    schema,
    messages,
  },
})
