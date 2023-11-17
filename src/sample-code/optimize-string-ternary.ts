import type { PresetConfig } from './presets'

export const ruleName = 'optimize-string-ternary'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `const foo = (bool: boolean) => [
  bool ? 'Bottle' : 'Boat',
  bool ? 'Worst' : 'Best',
  bool ? 'Star Light' : 'Star Bright',
]`
