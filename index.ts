import _ from 'lodash'

import declareKeyword, { RULE_NAME as declareKeywordName } from './rules/declare-keyword.js'
import noUselessFor, { RULE_NAME as noUselessForName } from './rules/no-avoidable-loop.js'
import noNoPlusPlus, { RULE_NAME as noNoPlusPlusName } from './rules/no-no-plusplus.js'
import noOvertime, { RULE_NAME as noOvertimeName } from './rules/no-overtime.js'
import preferNpm, { RULE_NAME as preferNpmName } from './rules/prefer-npm.js'
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
import emoji, { RULE_NAME as emojiName } from './rules/emoji.js'
import noCi, { RULE_NAME as noCiName } from './rules/no-ci.js'
import noTs, { RULE_NAME as noTsName } from './rules/no-ts.js'
import tab, { RULE_NAME as tabName } from './rules/tab.js'
import yes, { RULE_NAME as yesName } from './rules/yes.js'
import no, { RULE_NAME as noName } from './rules/no.js'

const name = 'eslint-plugin-ninja'

const rules = {
  [alignName]: align,
  [declareKeywordName]: declareKeyword,
  [emojiName]: emoji,
  [justify2Name]: justify2,
  [justifyName]: justify,
  [lotteryName]: lottery,
  [monopolyName]: monopoly,
  [noCiName]: noCi,
  [noName]: no,
  [noNoPlusPlusName]: noNoPlusPlus,
  [noObjectName]: noObject,
  [noOvertimeName]: noOvertime,
  [noRushName]: noRush,
  [noTsName]: noTs,
  [noRandomName]: noRandom,
  [noUselessForName]: noUselessFor,
  [noWoofName]: noWoof,
  [noXkcdName]: noXkcd,
  [preferNpmName]: preferNpm,
  [tabName]: tab,
  [yesName]: yes,
} as const

const config = {
  rules,
  configs: {
    all: { rules },
    recommended: {
      rules: _.pick(rules, [
        alignName,
        declareKeywordName,
        emojiName,
        justifyName,
        justify2Name,
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
        preferNpmName,
        yesName,
      ]),
    },
  },
  name,
} as const

export default config
