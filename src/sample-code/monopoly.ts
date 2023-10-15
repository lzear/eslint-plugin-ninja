import type { PresetConfig } from './presets.js'

export const ruleName = 'monopoly'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `
// eslint-config-import
/* eslint-config-perfectionist */
/* eslint-config-dont */

const config = {
  extends: [
    'eslint-config-dont',
    'eslint-config-unicorn',
  ],
}
`
