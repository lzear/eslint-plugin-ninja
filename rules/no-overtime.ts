import {
  addHours,
  addMinutes,
  addSeconds,
  formatDistance,
  getDay,
  isAfter,
  isBefore,
  startOfDay,
} from 'date-fns'

import type { RuleContext, RuleListener } from '../utils/eslint-types/Rule.js'

import { complete } from '../utils/complete.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import {
  MESSAGE_ID,
  noOvertimeImpl,
  NoOvertimeOptions,
  Weekday,
} from './no-overtime.impl.js'

type Options = [Partial<NoOvertimeOptions>]

export const RULE_NAME = 'no-overtime'

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: { description: 'disallow overwork' },
    schema: [
      {
        type: 'object',
        properties: {
          workdays: {
            type: 'array',
            items: { type: 'number' },
            default: [1, 2, 3, 4, 5],
          },
          start: { type: 'string', default: '08:00:00' },
          end: { type: 'string', default: '18:00:00' },
        },
      },
    ],
    messages: {
      day: "No overtime! This isn't a workday try again tomorrow",
      'hour-early':
        "No overtime! Workday hasn't started yet. Try again in {{ duration }}",
      'hour-late':
        'No overtime! Workday finished {{ duration }} ago. Try again tomorrow',
    },
  },
  defaultOptions: [
    {
      workdays: [1, 2, 3, 4, 5],
      start: '08:00:00',
      end: '18:00:00',
    },
  ],
  create: (context: Context): RuleListener => {
    const options = complete(context.options.at(0), {
      workdays: [1, 2, 3, 4, 5] as Weekday[],
      start: '08:00:00',
      end: '18:00:00',
    })

    return {
      Program: () => {
        const r = noOvertimeImpl(new Date(), options)
        if (!r) return
        if (r.messageId === 'day')
          context.report({
            loc: { column: 0, line: 1 },
            ...r,
            messageId: 'day',
          })
        if (r.messageId === 'hour-early')
          context.report({
            loc: { column: 0, line: 1 },
            ...r,
            data: r.data,
            messageId: 'hour-early',
          })
        if (r.messageId === 'hour-late')
          context.report({
            loc: { column: 0, line: 1 },
            ...r,
            data: r.data,
            messageId: 'hour-late',
          })
      },
    }
  },
})
