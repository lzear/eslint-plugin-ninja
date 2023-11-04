---
title: prefer-emoji
description: 💩
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/prefer-emoji.js';
</script>

> "A picture is worth a thousand words."

# Require variables and properties to be named using emojis (`prefer-emoji`)

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Emojis convey complex ideas succinctly and are universally recognized. Using
them as variable names enhances code clarity and expressiveness. Unfortunately,
the Javascript ecosystem doesn't embrace this potential as emojis can't be used
as variable names.

## 💡 Examples

::: code-group

```js [Check all]
// ❌ Incorrect
if (a) {
  b = c
  return foo(d, {
    e: f,
    g: h,
  })
}

// ✅ Correct
if (🍪) {
  ⛺️ = 🧲
  return 🐷️(🤹, {
    🦄: 🍭,
    🌺: 🙈,
  })
}
```

```js [Check properties only]
// ❌ Incorrect
if (a) {
  b = c
  return foo(d, {
    e: f,
    g: h,
  })
}

// ✅ Correct
if (a) {
  b = c
  return foo(d, {
    🦄: f,
    🌺: h,
  })
}
```

:::

## ⚙️ Options

**See
[eslint-plugin-unicorn/prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md)**,
which this rule is copied from.

### checkDefaultAndNamespaceImports

### checkFilenames

### checkProperties

### checkShorthandImports

### checkShorthandProperties

### checkVariables

### ignore

### replacements

## 🔧 Config

```js
{ rules: { 'ninja/prefer-emoji': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
