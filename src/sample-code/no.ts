import type { PresetConfig } from './presets.js'

export const ruleName = 'no'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `alert('hello world');`

export const fakeLint = async (code: string) => ({
  fix: {
    fixed: false,
    messages: [
      {
        column: 1,
        line: 1,
        message: 'No',
        messageId: 'no',
        nodeType: null,
        ruleId: 'no',
        severity: 2,
      },
    ],
    output: code,
  },
  verify: [
    {
      column: 1,
      line: 1,
      message: 'No',
      messageId: 'no',
      nodeType: null,
      ruleId: 'no',
      severity: 2,
    },
  ],
})
