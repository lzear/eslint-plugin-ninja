---
title: no-ci
description: Fails on CI
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText, fakeLint} from '../../src/sample-code/no-ci.js';
</script>

> "The Matrix is a system, Neo. That system is our enemy." — Morpheus

# Disallow running on CI (`no-ci`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅ `recommended`.

<!-- end auto-generated rule header -->

## 🔧 Config

```js
{ rules: { 'ninja/no-ci': 2 } }
```

## 🔗 See also

- [volkswagen](https://www.npmjs.com/package/volkswagen)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" :fakeLint="fakeLint" />
