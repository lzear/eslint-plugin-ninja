import type { PresetConfig } from './presets.js'

export const ruleName = 'prefer-emoji'

const defaultOptions = {
  checkDefaultAndNamespaceImports: false,
  checkFilenames: true,
  checkProperties: true,
  checkShorthandImports: false,
  checkShorthandProperties: true,
  checkVariables: false,
  ignore: [],
  replacements: {},
}

export const presetConfigs = [
  {
    config: {
      ...defaultOptions,
      checkDefaultAndNamespaceImports: true,
      checkShorthandImports: true,
      checkVariables: true,
    },
    name: 'all',
  },
  { config: defaultOptions, name: 'properties' },
] satisfies PresetConfig[]

export { webstormJsSample as initialText } from './webstorm-js-sample.js'
