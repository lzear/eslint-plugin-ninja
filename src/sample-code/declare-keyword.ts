import type { PresetConfig } from './presets'

export const ruleName = 'declare-keyword'

export const presetConfigs = [
  { config: { type: 'natural' }, name: 'natural' },
  { config: { type: 'suffix', oneLetter: true }, name: 'one letter suffix' },
  { config: { type: 'prefix' }, name: 'prefix' },
] satisfies PresetConfig[]

export const initialText = `const foo = 'bar'
let bar = 'foo'
var baz = 'fizz'
function bazz(fiz) {
  let bar = 'fizz'
  return bar + foo
}
interface Foo { bar: string }
enum Abcd { Foo, Bar, Baz }
class Bar {}
const fizz = new Bar('fizz')
const buzz = (foo: string) => foo
`
