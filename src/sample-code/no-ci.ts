import type { PresetConfig } from './presets'

export const ruleName = 'no-ci'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `// luckily we're not in the CI here
alert('hello world');`

export const fakeLint = async (code: string) => ({
  fix: {
    fixed: false,
    messages: [],
    output: code,
  },
  verify: [],
})
