import {
  RuleContext,
  RuleListener,
  RuleMetaData,
  RuleMetaDataDocs,
  RuleModule,
} from './Rule.js'

// export type NamedCreateRuleMetaDocs = Omit<RuleMetaDataDocs, 'url'>
export type NamedCreateRuleMeta<TMessageIds extends string> = Omit<
  RuleMetaData<TMessageIds>,
  'docs'
> & {
  docs: RuleMetaDataDocs
}
export interface RuleCreateAndOptions<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
> {
  create: (
    context: Readonly<RuleContext<TMessageIds, TOptions>>,
    optionsWithDefault: Readonly<TOptions>,
  ) => RuleListener
  defaultOptions: Readonly<TOptions>
}
export interface RuleWithMeta<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
> extends RuleCreateAndOptions<TOptions, TMessageIds> {
  meta: RuleMetaData<TMessageIds>
}
export interface RuleWithMetaAndName<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
> extends RuleCreateAndOptions<TOptions, TMessageIds> {
  meta: NamedCreateRuleMeta<TMessageIds>
  name: string
}
/**
 * Creates reusable function to create rules with default options and docs URLs.
 *
 * @param urlCreator Creates a documentation URL for a given rule name.
 * @returns Function to create a rule with the docs URL format.
 */
export type RuleCreator = (
  urlCreator: (ruleName: string) => string,
) => <TOptions extends readonly unknown[], TMessageIds extends string>({
  name,
  meta,
  ...rule
}: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>) => RuleModule<
  TMessageIds,
  TOptions,
  RuleListener
>
