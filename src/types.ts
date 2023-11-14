import plugin from '../index'
// import {z} from "zod";

export type RuleName = keyof typeof plugin.rules
export const ruleNames = Object.keys(plugin.rules) as RuleName[]
export const isRuleName = (rule: string): rule is RuleName =>
  ruleNames.includes(rule as RuleName)

// export const reqSchema = z.object({
//   code: z.string(),
//   rule: z.string(),
//   level: z.enum(['warn', 'error'] as const),
//   options: z.any().optional(),
// })
