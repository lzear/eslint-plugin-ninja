import type { PresetConfig } from './presets'

export const ruleName = 'no-woof'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `// woof
const WOOF = 'woof';

function woof() {
  return 'w00f';
}
`
