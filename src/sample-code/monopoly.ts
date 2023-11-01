import type { PresetConfig } from './presets.js'

export const ruleName = 'monopoly'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `
// eslint-plugin-import
/* eslint-plugin-perfectionist */
/* eslint-plugin-ninja */

const config = {
  extends: [
    'eslint-plugin-ninja',
    'eslint-plugin-unicorn',
  ],
}
`
