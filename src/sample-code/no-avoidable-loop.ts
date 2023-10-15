import type { PresetConfig } from './presets.js'

export const ruleName = 'no-avoidable-loop'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `
for (let i = 0; i < 10; i += 1) {}

for (let j of [a,b,c]) {}

for (let j in {a,b,c}) {}
`
