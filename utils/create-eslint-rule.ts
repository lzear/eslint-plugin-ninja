/* eslint-disable */
import * as uuu from '@typescript-eslint/utils'
import { RuleWithMetaAndName } from './eslint-types/RuleCreator'
import { RuleListener, RuleModule } from './eslint-types/Rule'

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
  ruleName => `https://eslint-ninja.vercel.app/rules/${ruleName}`,
)
