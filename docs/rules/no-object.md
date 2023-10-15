---
title: no-object
description: Use Map instead of objects
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/no-object.js';
</script>

> "New is always Better" — Barney Stinson

# Disallow object literals, prefer Map (`dont/no-object`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Leverage the modern and performance-optimized features of Map over traditional objects for key-value collections. This
rule promotes the use of Map to ensure consistency, avoid prototype pitfalls, and harness the power of ES6 collections
more effectively.

## 💡 Examples

```ts
// ❌ Incorrect
const obj = {
  foo: 'bar',
  bar: 2,
}

// ✅ Correct
const map = new Map([
  ['foo', 'bar'],
  ['bar', 2],
])
```

## 🔧 Config

```js
{ rules: { 'dont/object': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
