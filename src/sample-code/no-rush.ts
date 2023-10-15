import type { PresetConfig } from './presets.js'

export const ruleName = 'no-rush'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `console.log('Hello')
`

const sleep = (delayMs: number) =>
  new Promise(resolve => setTimeout(resolve, delayMs))

export const fakeLint = async (code: string, { delay }: { delay?: number }) => {
  delay && delay > 0 && (await sleep(delay / 1000))
  return {
    fix: {
      fixed: false,
      messages: [],
      output: code,
    },
    verify: [],
  }
}
