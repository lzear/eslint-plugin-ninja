import { RuleTester } from '@typescript-eslint/rule-tester'
import { afterAll, describe, it } from 'vitest'
import { dedent } from 'ts-dedent'

import rule, { RULE_NAME } from '../rules/sort-named-exports'
import { SortOrder, SortType } from '../typings'

describe(RULE_NAME, () => {
  RuleTester.describeSkip = describe.skip
  RuleTester.afterAll = afterAll
  RuleTester.describe = describe
  RuleTester.itOnly = it.only
  RuleTester.itSkip = it.skip
  RuleTester.it = it

  const ruleTester = new RuleTester({
    parser: '@typescript-eslint/parser',
  })

  describe(`${RULE_NAME}: sorting by alphabetical order`, () => {
    const type = 'alphabetical-order'

    const options = {
      type: SortType.alphabetical,
      order: SortOrder.asc,
      'ignore-case': false,
    }

    ruleTester.run(`${RULE_NAME}(${type}): sorts named exports`, rule, {
      valid: [
        {
          code: 'export { ErisBoreas, Rudeus, RuijerdSuperdia }',
          options: [options],
        },
      ],
      invalid: [
        {
          code: dedent`
            export {
              Rudeus,
              RuijerdSuperdia,
              ErisBoreas
            }
          `,
          output: dedent`
            export {
              ErisBoreas,
              Rudeus,
              RuijerdSuperdia
            }
          `,
          options: [options],
          errors: [
            {
              messageId: 'unexpectedNamedExportsOrder',
              data: {
                left: 'RuijerdSuperdia',
                right: 'ErisBoreas',
              },
            },
          ],
        },
      ],
    })
  })

  describe(`${RULE_NAME}: sorting by natural order`, () => {
    const type = 'natural-order'

    const options = {
      type: SortType.natural,
      order: SortOrder.asc,
      'ignore-case': false,
    }

    ruleTester.run(`${RULE_NAME}(${type}): sorts named exports`, rule, {
      valid: [
        {
          code: 'export { ErisBoreas, Rudeus, RuijerdSuperdia }',
          options: [options],
        },
      ],
      invalid: [
        {
          code: dedent`
            export {
              Rudeus,
              RuijerdSuperdia,
              ErisBoreas
            }
          `,
          output: dedent`
            export {
              ErisBoreas,
              Rudeus,
              RuijerdSuperdia
            }
          `,
          options: [options],
          errors: [
            {
              messageId: 'unexpectedNamedExportsOrder',
              data: {
                left: 'RuijerdSuperdia',
                right: 'ErisBoreas',
              },
            },
          ],
        },
      ],
    })
  })

  describe(`${RULE_NAME}: sorting by line length`, () => {
    const type = 'line-length-order'

    const options = {
      type: SortType['line-length'],
      order: SortOrder.desc,
    }

    ruleTester.run(`${RULE_NAME}(${type}): sorts named exports`, rule, {
      valid: [
        {
          code: 'export { RuijerdSuperdia, ErisBoreas, Rudeus }',
          options: [options],
        },
      ],
      invalid: [
        {
          code: dedent`
            export {
              Rudeus,
              RuijerdSuperdia,
              ErisBoreas
            }
          `,
          output: dedent`
            export {
              RuijerdSuperdia,
              ErisBoreas,
              Rudeus
            }
          `,
          options: [options],
          errors: [
            {
              messageId: 'unexpectedNamedExportsOrder',
              data: {
                left: 'Rudeus',
                right: 'RuijerdSuperdia',
              },
            },
          ],
        },
      ],
    })
  })

  describe(`${RULE_NAME}: misc`, () => {
    ruleTester.run(
      `${RULE_NAME}: sets alphabetical asc sorting as default`,
      rule,
      {
        valid: [
          'export { KayoHinazuki, SatoruFujinuma }',
          {
            code: 'export { log, log10, log1p, log2 }',
            options: [{}],
          },
        ],
        invalid: [
          {
            code: dedent`
              export { SatoruFujinuma, KayoHinazuki }
            `,
            output: dedent`
              export { KayoHinazuki, SatoruFujinuma }
            `,
            errors: [
              {
                messageId: 'unexpectedNamedExportsOrder',
                data: {
                  left: 'SatoruFujinuma',
                  right: 'KayoHinazuki',
                },
              },
            ],
          },
        ],
      },
    )
  })
})
