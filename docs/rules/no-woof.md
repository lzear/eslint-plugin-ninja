---
title: no-woof
description: No woof!
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/no-woof.js';
</script>

> "Woof" — Randalf T.

# Disallow woof! (`no-woof`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅ `recommended`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

No woof!

## 💡 Examples

```js
// ❌ Incorrect
// woof Woof! WOOF!
const woof = 'woof'

// ✅ Correct
const foo = 'bar'
```

## 🔧 Config

```js
{ rules: { 'ninja/no-woof': 2 } }
```

## 🔗 See also

- [private joke](https://en.wikipedia.org/wiki/Private_joke)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
