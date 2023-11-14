import _ from 'lodash'

import declareKeyword, { RULE_NAME as declareKeywordName } from './rules/declare-keyword.js'
import noUselessFor, { RULE_NAME as noUselessForName } from './rules/no-avoidable-loop.js'
import noNoPlusPlus, { RULE_NAME as noNoPlusPlusName } from './rules/no-no-plusplus.js'
import preferEmoji, { RULE_NAME as preferEmojiName } from './rules/prefer-emoji.js'
import noOvertime, { RULE_NAME as noOvertimeName } from './rules/no-overtime.js'
import preferNpm, { RULE_NAME as preferNpmName } from './rules/prefer-npm.js'
import preferTab, { RULE_NAME as preferTabName } from './rules/prefer-tab.js'
import noObject, { RULE_NAME as noObjectName } from './rules/no-object.js'
import noRandom, { RULE_NAME as noRandomName } from './rules/no-random.js'
import justify2, { RULE_NAME as justify2Name } from './rules/justify2.js'
import monopoly, { RULE_NAME as monopolyName } from './rules/monopoly.js'
import justify, { RULE_NAME as justifyName } from './rules/justify.js'
import lottery, { RULE_NAME as lotteryName } from './rules/lottery.js'
import noRush, { RULE_NAME as noRushName } from './rules/no-rush.js'
import noWoof, { RULE_NAME as noWoofName } from './rules/no-woof.js'
import noXkcd, { RULE_NAME as noXkcdName } from './rules/no-xkcd.js'
import align, { RULE_NAME as alignName } from './rules/align.js'
import noCi, { RULE_NAME as noCiName } from './rules/no-ci.js'
import noTs, { RULE_NAME as noTsName } from './rules/no-ts.js'
import yes, { RULE_NAME as yesName } from './rules/yes.js'
import no, { RULE_NAME as noName } from './rules/no.js'

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
  preferEmojiName,
  preferNpmName,
  yesName,
] as const

const all: Record<string, [0|1|2, unknown]> = {}
const recommended: Record<string, [0|1|2, unknown]> = {}

for (const name of Object.keys(rules)) all[`ninja/${name}`] = [2, {}]
for (const name of recommendedRules) recommended[`ninja/${name}`] = [2, {}]

recommended['ninja/no-rush'] = [1, {delay: 1}]
recommended['ninja/lottery'] = [2, {probability: 0.9}]
recommended['ninja/prefer-emoji'] = [1, {}]

const config = {
  rules,
  configs: {
    all: { rules: all },
    recommended: { rules: recommended,},
  },
  name,
} as const

export default config
