---
title: no-ts
description: Disallow gymnastics needed to please the TS compiler
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/no-ts.js';
</script>

> "So farewell, TypeScript. May you bring much rigor and satisfaction to your tribe while letting the rest of us enjoy
> JavaScript in the glorious spirit it was originally designed: Free of strong typing" — David Heinemeier Hansson

# Disallow gymnastics needed to please the TS compiler (`dont/no-ts`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Prevent type annotations in your code.

## 💡 Examples

```ts
// ❌ Incorrect
function tsAdd(a: number, b: number): number
function tsAdd(a: string, b: string): string
function tsAdd<T extends any[]>(a: T, b: T): T
function tsAdd(a: any, b: any): any {
  if (typeof a === 'string' && typeof b === 'string') return a + b
  if (typeof a === 'number' && typeof b === 'number') return a + b
  if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b]
  throw new Error('invalid types!')
}

tsAdd(1, 2)
tsAdd('a', 'b')
tsAdd([1, 2], [3, 4])

// ✅ Correct
const add = (a, b) => a + b
add(1, [2, 3])
```

## 🔧 Config

```js
{ rules: { 'dont/no-ts': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
