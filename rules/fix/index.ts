'use strict'

import replaceTemplateElement from './replace-template-element.js'

import 	renameVariable from './rename-variable.js';
import 	replaceNodeOrTokenAndSpacesBefore from './replace-node-or-token-and-spaces-before.js';
import 	removeSpacesAfter from './remove-spaces-after.js';
import 	fixSpaceAroundKeyword from './fix-space-around-keywords.js';
import 	replaceStringLiteral from './replace-string-literal.js';
import 	addParenthesizesToReturnOrThrowExpression from './add-parenthesizes-to-return-or-throw-expression.js';

export {
	// Utilities
	
	

	
	
	
	
	
	
	
	replaceTemplateElement,
	
	renameVariable,
	replaceNodeOrTokenAndSpacesBefore,
	removeSpacesAfter,
	fixSpaceAroundKeyword,
	replaceStringLiteral,
	addParenthesizesToReturnOrThrowExpression,
};

export {default as extendFixRange} from './extend-fix-range.js';
export {default as appendArgument} from './append-argument.js';
export {default as removeParentheses} from './remove-parentheses.js'
export {default as replaceArgument} from './replace-argument.js';
export {default as removeArgument} from './remove-argument.js'
export {default as switchCallExpressionToNewExpression} from './switch-call-expression-to-new-expression.js';
export {default as switchNewExpressionToCallExpression} from './switch-new-expression-to-call-expression.js'
export {default as removeMethodCall} from './remove-method-call.js';
export {default as removeMemberExpressionProperty} from './remove-member-expression-property.js'
export {default as replaceReferenceIdentifier} from './replace-reference-identifier.js';