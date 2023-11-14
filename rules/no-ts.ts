import type { TSESTree } from '@typescript-eslint/types'

import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule'

import { createEslintRule } from '../utils/create-eslint-rule'

type MESSAGE_ID = 'code' | 'file'

type Options = [unknown]

// The code not only reads much better, it's also freed of the type wrangling and gymnastics needed to please the TS compiler

export const RULE_NAME = 'no-ts'

type Context = RuleContext<MESSAGE_ID, Options>

const eewTsFilesYuk = [/tsconfig*\.json/, /.+ts/]

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow gymnastics needed to please the TS compiler',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {},
      },
    ],
    messages: {
      file: 'Invalid file `{{ filename }}`. Rename your file to .js and remove your TS config.',
      code: '`{{ code }}` Typescript is not allowed.',
    },
  },
  defaultOptions: [{}],
  create: (context: Context): RuleListener => {
    const filenameWithExtension = context.physicalFilename
    const sourceCode = context.getSourceCode()
    const report = (node: TSESTree.Node | TSESTree.Token) => {
      context.report({
        node,
        messageId: 'code',
        fix: fixer => fixer.replaceText(node, ''),
        data: { code: sourceCode.getText(node) },
      })
    }
    return {
      Program: () => {
        if (
          filenameWithExtension &&
          eewTsFilesYuk.some(r => r.test(filenameWithExtension))
        ) {
          context.report({
            loc: { column: 0, line: 1 },
            messageId: 'file',
            data: { filename: filenameWithExtension },
          })
        }
      },
      // TSAbstractKeyword: report,
      // TSAbstractMethodDefinition: report,
      // TSAbstractPropertyDefinition: report,
      // TSAnyKeyword: report,
      TSArrayType: report,
      TSAsExpression: report,
      // TSAsyncKeyword: report,
      // TSBigIntKeyword: report,
      // TSBooleanKeyword: report,
      // TSCallSignatureDeclaration: report,
      // TSClassImplements: report,
      TSConditionalType: report,
      // TSConstructSignatureDeclaration: report,
      // TSConstructorType: report,
      // TSDeclareFunction: report,
      // TSDeclareKeyword: report,
      // TSEmptyBodyFunctionExpression: report,
      TSEnumDeclaration: report,
      // TSEnumMember: report,
      // TSExportAssignment: report,
      // TSExportKeyword: report,
      // TSExternalModuleReference: report,
      TSFunctionType: report,
      // TSImportEqualsDeclaration: report,
      TSImportType: report,
      // TSIndexSignature: report,
      // TSIndexedAccessType: report,
      TSInferType: report,
      // TSInterfaceBody: report,
      TSInterfaceDeclaration: report,
      // TSInterfaceHeritage: report,
      TSIntersectionType: report,
      TSLiteralType: report,
      TSMappedType: report,
      // TSMethodSignature: report,
      // TSModuleBlock: report,
      // TSModuleDeclaration: report,
      // TSNamespaceExportDeclaration: report,
      TSNeverKeyword: report,
      // TSNonNullExpression: report,
      // TSNullKeyword: report,
      // TSNumberKeyword: report,
      // TSObjectKeyword: report,
      TSOptionalType: report,
      // TSParameterProperty: report,
      // TSPrivateKeyword: report,
      // TSPropertySignature: report,
      // TSProtectedKeyword: report,
      // TSPublicKeyword: report,
      // TSQualifiedName: report,
      // TSReadonlyKeyword: report,
      TSRestType: report,
      TSStaticKeyword: report,
      // TSStringKeyword: report,
      // TSSymbolKeyword: report,
      // TSThisType: report,
      TSTupleType: report,
      TSTypeAliasDeclaration: report,
      TSTypeAnnotation: report,
      TSTypeAssertion: report,
      TSTypeLiteral: report,
      TSTypeOperator: report,
      TSTypeParameter: report,
      TSTypeParameterDeclaration: report,
      TSTypeParameterInstantiation: report,
      TSTypePredicate: report,
      TSTypeQuery: report,
      TSTypeReference: report,
      // TSUndefinedKeyword: report,
      TSUnionType: report,
      TSUnknownKeyword: report,
      // TSVoidKeyword: report,
    }
  },
})
