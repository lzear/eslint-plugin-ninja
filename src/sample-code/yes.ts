import type { PresetConfig } from './presets'

export const ruleName = 'yes'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `// just pass
`

export const fakeLint = async (code: string) => ({
  fix: {
    fixed: false,
    messages: [],
    output: code,
  },
  verify: [],
})
