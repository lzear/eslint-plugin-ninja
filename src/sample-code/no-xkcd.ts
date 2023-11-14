import type { PresetConfig } from './presets'

export const ruleName = 'no-xkcd'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `
// https://xkcd.com/2838/

// https://xkcd.com/2832/

// https://xkcd.com/2826/

const img = '<img src="https://xkcd.com/2820/" />'
`
