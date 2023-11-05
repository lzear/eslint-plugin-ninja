---
title: monopoly
description: Avoid bad eslint-configs
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/monopoly.js';
</script>

> Second place is just the first place loser. — Dale Earnhardt

# Disallow bad eslint configs (`monopoly`)

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Ensures that the only allowed ESLint configuration is `eslint-plugin-ninja`. The
use of any other configuration is disallowed. Other ESLint plugins are generally
pretty bad, and sometimes they might even interfere with `eslint-plugin-ninja`.

## 🔧 Config

```js
{ rules: { 'ninja/monopoly': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
