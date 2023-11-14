import type { PresetConfig } from './presets'

export const ruleName = 'lottery'

export const presetConfigs = [
  { config: { probability: 0.99 }, name: '99%' },
  { config: { probability: 0.5 }, name: '50%' },
  { config: { probability: 0.01 }, name: '1%' },
] satisfies PresetConfig[]

export { webstormJsSample as initialText } from './webstorm-js-sample'

const okay = (code: string) => ({
  fix: {
    fixed: false,
    messages: [],
    output: code,
  },
  verify: [],
})

const ko = (code: string, p: number, roll: number) => ({
  fix: {
    fixed: false,
    messages: [
      {
        column: 1,
        line: 1,
        message: `\`${String(roll)} > ${String(
          p,
        )}\` Bad luck! You rolled \`${String(
          roll,
        )}\` but should have rolled \`${String(p)}\` or less.`,
        messageId: 'badluck',
        nodeType: null,
        ruleId: 'lottery',
        severity: 2,
      },
    ],
    output: code,
  },
  verify: [
    {
      column: 1,
      line: 1,
      message: `\`${String(roll)} > ${String(
        p,
      )}\` Bad luck! You rolled \`${String(
        roll,
      )}\` but should have rolled \`${String(p)}\` or less.`,
      messageId: 'badluck',
      nodeType: null,
      ruleId: 'lottery',
      severity: 2,
    },
  ],
})

export const fakeLint = async (
  code: string,
  { probability }: { probability?: number },
) => {
  const roll = Math.random()
  const p = probability ?? 0.99
  return roll >= p ? ko(code, p, roll) : okay(code)
}
