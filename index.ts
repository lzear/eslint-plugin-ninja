import optimiseStringTernary, { RULE_NAME as optimiseStringTernaryName } from './rules/optimize-string-ternary'
import declareKeyword, { RULE_NAME as declareKeywordName } from './rules/declare-keyword'
import noUselessFor, { RULE_NAME as noUselessForName } from './rules/no-avoidable-loop'
import noNoPlusPlus, { RULE_NAME as noNoPlusPlusName } from './rules/no-no-plusplus'
import preferEmoji, { RULE_NAME as preferEmojiName } from './rules/prefer-emoji'
import noOvertime, { RULE_NAME as noOvertimeName } from './rules/no-overtime'
import preferNpm, { RULE_NAME as preferNpmName } from './rules/prefer-npm'
import preferTab, { RULE_NAME as preferTabName } from './rules/prefer-tab'
import noObject, { RULE_NAME as noObjectName } from './rules/no-object'
import noRandom, { RULE_NAME as noRandomName } from './rules/no-random'
import justify2, { RULE_NAME as justify2Name } from './rules/justify2'
import monopoly, { RULE_NAME as monopolyName } from './rules/monopoly'
import justify, { RULE_NAME as justifyName } from './rules/justify'
import lottery, { RULE_NAME as lotteryName } from './rules/lottery'
import noRush, { RULE_NAME as noRushName } from './rules/no-rush'
import noWoof, { RULE_NAME as noWoofName } from './rules/no-woof'
import noXkcd, { RULE_NAME as noXkcdName } from './rules/no-xkcd'
import align, { RULE_NAME as alignName } from './rules/align'
import noCi, { RULE_NAME as noCiName } from './rules/no-ci'
import noTs, { RULE_NAME as noTsName } from './rules/no-ts'
import yes, { RULE_NAME as yesName } from './rules/yes'
import no, { RULE_NAME as noName } from './rules/no'

const name = 'eslint-plugin-ninja'

const rules = {
  [alignName]: align,
  [declareKeywordName]: declareKeyword,
  [justify2Name]: justify2,
  [justifyName]: justify,
  [lotteryName]: lottery,
  [monopolyName]: monopoly,
  [noCiName]: noCi,
  [noName]: no,
  [noNoPlusPlusName]: noNoPlusPlus,
  [noObjectName]: noObject,
  [noOvertimeName]: noOvertime,
  [noRandomName]: noRandom,
  [noRushName]: noRush,
  [noTsName]: noTs,
  [noUselessForName]: noUselessFor,
  [noWoofName]: noWoof,
  [noXkcdName]: noXkcd,
  [optimiseStringTernaryName]: optimiseStringTernary,
  [preferEmojiName]: preferEmoji,
  [preferNpmName]: preferNpm,
  [preferTabName]: preferTab,
  [yesName]: yes,
} as const

const recommendedRules = [
  alignName,
  declareKeywordName,
  justifyName,
  lotteryName,
  monopolyName,
  noCiName,
  noNoPlusPlusName,
  noObjectName,
  noOvertimeName,
  noRushName,
  noTsName,
  noUselessForName,
  noWoofName,
  noXkcdName,
  optimiseStringTernaryName,
  preferEmojiName,
  preferNpmName,
  yesName,
] as const

const all: Record<string, [0 | 1 | 2, unknown]> = {}
const recommended: Record<string, [0 | 1 | 2, unknown]> = {}

for (const n of Object.keys(rules)) all[`ninja/${n}`] = [2, {}]
for (const n of recommendedRules) recommended[`ninja/${n}`] = [2, {}]

recommended['ninja/no-rush'] = [1, { delay: 1 }]
recommended['ninja/lottery'] = [2, { probability: 0.9 }]
recommended['ninja/prefer-emoji'] = [1, {}]

const config = {
  rules,
  configs: {
    all: { rules: all },
    recommended: { rules: recommended },
  },
  name,
} as const

export default config
