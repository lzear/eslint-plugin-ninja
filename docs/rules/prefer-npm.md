---
title: prefer-npm
description: Load packages from NPM instead of using obscure vanilla JS
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/prefer-npm.js';
</script>

> "[…] and I do open source because, Power To The People" — Azer Koçulu

# Require from npm instead of using JS builtins (`prefer-npm`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅
`recommended`.

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Using NPM packages over native JavaScript has many advantages:

1. Controlled Updates: Decide when to upgrade, avoiding sudden breaks.
2. Contribute Easily: Open-source and accessible nature allows for quick bug
   fixes or enhancements.
3. Find Better Solutions: Often more efficient or elegant than native methods.
4. Flexibility: Avoid lock-ins; switch packages as needs evolve.
5. Community Support: Active communities mean faster fixes and richer
   documentation.
6. Tailored Solutions: Greater customization options than native
   functionalities.

## 💡 Examples

```js
// ❌ Incorrect
const padded = str.padStart(' ', 10) // starts on which end? Right or left?
const color = n % 2 ? 'blue' : 'red' // wtf is '%' ?

// ✅ Correct
const leftPad = require('left-pad')
const isOdd = require('is-odd')
const padded = leftPad(str, 10)
const color = isOdd(n) ? 'blue' : 'red'
```

## 🔧 Config

```js
{ rules: { 'ninja/prefer-npm': 2 } }
```

## 🔗 See also

- [is-odd](https://www.npmjs.com/package/is-odd)
- [is-is-odd](https://www.npmjs.com/package/is-is-odd)
- [left-pad](https://www.npmjs.com/package/left-pad)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
