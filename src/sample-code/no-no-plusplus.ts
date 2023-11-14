import type { PresetConfig } from './presets'

export const ruleName = 'no-no-plusplus'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `
const b = a += 1;
const c = a -= 1;

for (let i = 0; i < 10; i += 1) {}
`
