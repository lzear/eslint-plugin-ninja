import type { PresetConfig } from './presets.js'

export const ruleName = 'align'

export const presetConfigs = [
  { config: { side: 'center' }, name: 'Center' },
  { config: { side: 'right' }, name: 'Right' },
  { config: { side: 'left' }, name: 'Left' },
  { config: { side: 'rtlIndent' }, name: 'rtlIndent' },
  { config: { side: 'ltrIndent' }, name: 'ltrIndent' },
] satisfies PresetConfig[]

export const initialText = `if (a) {
b = c;
function foo(d) {
e = f;
}
}`
