---
title: no-no-plusplus
description: Use `++` instead of `+=`
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/no-no-plusplus.js';
</script>

> The less code, the fewer bugs. — Kevlin Henney

# Enforce the unary operators ++ and -- (`no-no-plusplus`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅
`recommended`.

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Use `++` instead of `+= 1`, and `--` instead of `-= 1`.

The initial plan was to replace `+= 4` by `++++++++`, and so on. But it turns
out consecutive `++` don't work 🙄

## 🔗 See also

- [no-plusplus](https://eslint.org/docs/latest/rules/no-plusplus)

## 🔧 Config

```js
{ rules: { 'ninja/no-no-plusplus': 2 } }
```

## 🔗 See also

- [no-plusplus](https://eslint.org/docs/latest/rules/no-plusplus)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
