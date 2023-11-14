---
title: yes
description: Just passes
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText, fakeLint} from '../../src/sample-code/yes.js';
</script>

> Silence is a source of great strength. — Lao Tzu

# Enforce nothing (`yes`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅ `recommended`.

<!-- end auto-generated rule header -->

## 🔧 Config

```js
{ rules: { 'ninja/yes': 2 } }
```

## 🔗 See also

- [node-noop](https://github.com/euank/node-noop): used in the implementation of
  this rule.

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" :fakeLint="fakeLint" />
