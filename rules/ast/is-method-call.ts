/* eslint-disable */
// @ts-nocheck

import type { TSESTree } from '@typescript-eslint/types'

import _ from 'lodash'

import { isCallExpression } from './call-or-new-expression.js'
import isMemberExpression from './is-member-expression.js'

const { pick } = _

/**
@param {
	{
		// `isCallExpression` options
		argumentsLength?: number,
		minimumArguments?: number,
		maximumArguments?: number,
		optionalCall?: boolean,
		allowSpreadElement?: boolean,

		// `isMemberExpression` options
		method?: string,
		methods?: string[],
		object?: string,
		objects?: string[],
		optionalMember?: boolean,
		computed?: boolean
	} | string | string[]
} [options]
@returns {string}
*/
export const isMethodCall: any = (
  node: TSESTree.CallExpression,
  options:
    | {
        method?: string
        methods?: string[]
        optionalCall?: unknown
        optionalMember?: unknown
      }
    | string,
) => {
  if (typeof options === 'string') {
    options = { methods: [options] }
  }

  if (Array.isArray(options)) {
    options = { methods: options }
  }

  const { method, methods, optionalCall, optionalMember } = {
    method: '',
    methods: [],
    ...options,
  }

  return (
    isCallExpression(node, {
      ...pick(options, [
        'argumentsLength',
        'minimumArguments',
        'maximumArguments',
        'allowSpreadElement',
      ]),
      optional: optionalCall,
    }) &&
    isMemberExpression(node.callee, {
      ...pick(options, ['object', 'objects', 'computed']),
      optional: optionalMember,
      properties: methods,
      property: method,
    })
  )
}

export default isMethodCall
