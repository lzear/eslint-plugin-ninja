/* eslint-disable */
import * as uuu from '@typescript-eslint/utils'
import { RuleWithMetaAndName } from './eslint-types/RuleCreator.js'
import { RuleListener, RuleModule } from './eslint-types/Rule.js'

// @ts-expect-error ...
export let createEslintRule: <
  TOptions extends readonly unknown[],
  TMessageIds extends string,
>({
  name,
  meta,
  ...rule
}: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>) => RuleModule<
  TMessageIds,
  TOptions,
  RuleListener
> = uuu.ESLintUtils.RuleCreator(
  ruleName => `https://www.dont.ninja/rules/${ruleName}`,
)
