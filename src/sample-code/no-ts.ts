import type { PresetConfig } from './presets'

export const ruleName = 'no-ts'

export const presetConfigs = [] satisfies PresetConfig[]

export const initialText = `
interface Foo {
  bar: string
}

type Bar = {foo: string}

const add = (a: number, b: number): number => a + b
`
