import type { PresetConfig } from './presets'

export const presetConfigs = [] satisfies PresetConfig[]

export const ruleName = 'quine'

// eslint-disable-next-line no-template-curly-in-string
export const initialText = '($=_=>`($=${$})()`)()'
