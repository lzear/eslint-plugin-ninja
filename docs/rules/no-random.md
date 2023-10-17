---
title: no-random
description: Disallow non-deterministic randomness
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/no-random.js';
</script>

> "God does not play dice with the universe" — Albert Einstein

# Disallow non-deterministic randomness (`no-random`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Code should be predictable. Replaces `Math.random()` with a deterministic value.

![random](/random_number.png)
*https://xkcd.com/221/*

## 💡 Examples

```ts
// ❌ Incorrect
const foo = Math.random();

// ✅ Correct
const bar = 0.19891733174822845
```

## 🔧 Config

```js
{ rules: { 'dont/no-random': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
