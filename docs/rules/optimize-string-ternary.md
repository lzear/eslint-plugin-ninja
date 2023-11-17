---
title: optimize-string-ternary
description: Disallow repetition when building strings with ternaries=
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/optimize-string-ternary';
</script>

> Duplication is the primary enemy of a well-designed system. — Robert C. Martin

# Disallow repetition when building strings with ternaries (`optimize-string-ternary`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅
`recommended`.

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

This rule disallows repetition when building strings with ternaries.

## 💡 Examples

```js
// ❌ Incorrect
const CauseOrCampaign = !isNotCause ? 'Cause' : 'Campaign'

// ✅ Correct
const CauseOrCampaign = 'Ca' + (!isNotCause ? 'use' : 'mpaign')
```

## 🔧 Config

```js
{ rules: { 'ninja/optimize-string-ternary': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
