import type { PresetConfig } from './presets'

export const ruleName = 'prefer-npm'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `
const a = '123'.padStart(12)
const b = '123'.padStart(12, '*')
const c = '123'.padEnd(12)
const d = '123'.padEnd(12, '*')
const e = 31 % 2

const isOdd = (n) => {
  if (n === 0) return false
  if (!Number.isInteger(n)) throw new Error('expected an integer')
  return !isOdd(Math.abs(n) - 1)
}
`
