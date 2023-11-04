import type { VercelRequest, VercelResponse } from '@vercel/node'

import * as ppp from '@typescript-eslint/parser'
import { Linter } from 'eslint'

import plugin from '../index.js'

type RuleName = keyof typeof plugin.rules

const ruleNames = Object.keys(plugin.rules) as RuleName[]
const isRuleName = (rule: string): rule is RuleName =>
  ruleNames.includes(rule as RuleName)

const lintLocal = <Rule extends RuleName>(
  code: string,
  rule: Rule,
  options?: unknown,
) => {
  const linter = new Linter()
  // @ts-expect-error ...
  linter.defineRule(rule, plugin.rules[rule])
  linter.defineParser('@typescript-eslint/parser', ppp as Linter.ParserModule)
  const config: Linter.Config | Linter.FlatConfig[] = {
    env: { es6: true },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {},
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: { [rule]: [2, options] },
  }

  const lintOptions = { filename: 'foo.ts' }
  return {
    fix: linter.verifyAndFix(code, config, lintOptions),
    verify: linter.verify(code, config, lintOptions),
  }
}

const lintServerless = async (request: VercelRequest, res: VercelResponse) => {
  const parsed = JSON.parse(request.body) as {
    options?: unknown
    code: string
    rule: string
  }

  // if (!parsed.success) return res.status(400).send({error: 'Invalid payload'})
  const { code, options, rule } = parsed

  if (!isRuleName(rule)) {
    return res.status(400).send({ error: 'invalid rule name' })
  }
  const lintResults = lintLocal(code, rule, options)
  return res.status(200).send(lintResults)
}

export default lintServerless
