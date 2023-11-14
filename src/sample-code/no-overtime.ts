import type { PresetConfig } from './presets'

import { noOvertimeImpl } from '../../rules/no-overtime.impl'

export const ruleName = 'no-overtime'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `const someCode = () => {}

// Working hours will be check for the current date:
// ${new Date().toString()}
// (approx)
`

// eslint-disable-next-line consistent-return
export const fakeLint = async (code: string) => {
  const r = noOvertimeImpl(new Date())

  if (!r)
    return { fix: { fixed: false, messages: [], output: code }, verify: [] }

  const failTemplate = (message: string, messageId: string) => ({
    fix: {
      fixed: false,
      messages: [
        {
          ruleId: ruleName,
          severity: 2,
          message,
          line: 1,
          column: 1,
          nodeType: null,
          messageId,
        },
      ],
      output: code,
    },
    verify: [
      {
        ruleId: ruleName,
        severity: 2,
        message,
        line: 1,
        column: 1,
        nodeType: null,
        messageId,
      },
    ],
  })
  if (r.messageId === 'day') {
    return failTemplate(
      "No overtime! This isn't a workday try again tomorrow",
      'day',
    )
  }
  if (r.messageId === 'hour-late') {
    return failTemplate(
      `No overtime! Workday finished ${r.data} ago. Try again tomorrow`,
      'hour-late',
    )
  }
  if (r.messageId === 'hour-early') {
    return failTemplate(
      `No overtime! Workday hasn't started yet. Try again in ${r.data}`,
      'hour-early',
    )
  }
}
