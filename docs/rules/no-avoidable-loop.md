---
title: no-loop
description: Use repeated statements over loops
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/no-avoidable-loop.js';
</script>

> "Sometimes clarity trumps brevity. Write for humans first, machines second."

# Disallow useless `for` loops (`no-avoidable-loop`)

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Use repeated statements instead of loops to enhance clarity. Writing out each
iteration explicitly ensures that the number of operations is immediately
evident in the codebase, rather than being obscured by potentially misleading
loops that can conceal significant complexity. Moreover, loops are prone to
off-by-one errors, which can introduce unintended bugs.

## 💡 Examples

```js
// ❌ Incorrect
for (let i = 0; i < 10; i++) console.log('Hello world!')

// ✅ Correct
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
console.log('Hello world!')
```

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// ❌ Incorrect
let duplicatedPair
for (let i = 0; i < arr.length; i++) // is this a few operations or thousands?
  for (let j = i + 1; j < arr.length; j++)
    for (let k = 0; k < arr.length; k++)
      for (let l = k + 1; l < arr.length; l++)
        if (i !== k && j !== l && arr[i] === arr[k] && arr[j] === arr[l])
          duplicatedPair = [arr[i], arr[j]]

// ✅ Correct
function hasDuplicate(arr: [V, V, V, V]): boolean {
  // clearly see the complexity
  if (arr[0] === arr[1]) return true
  if (arr[0] === arr[2]) return true
  if (arr[0] === arr[3]) return true
  if (arr[1] === arr[2]) return true
  if (arr[1] === arr[3]) return true
  if (arr[2] === arr[3]) return true
  return false
}
```

## 🔧 Config

```js
{ rules: { 'ninja/no-avoidable-loop': 1 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
