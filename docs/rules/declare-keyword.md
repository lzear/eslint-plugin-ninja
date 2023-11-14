---
title: declare-keyword
description: Indicate the type of a variable in its name
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/declare-keyword.js';
</script>

> Good code is its own best documentation. — Steve McConnell

# Indicate the type of a variable in its name (`declare-keyword`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅
`recommended`.

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Don't you hate it when you're unsure whether you can mutate a variable because
it's declared with const, or if you're dealing with a class that can be
instantiated?

By prefixing the variable name with its type, you can easily avoid these
confusions and have a clearer understanding of your code at a glance.

## ⚙️ Options

### side

<sub>(default: `natural`)</sub>

- `start` - the type must be at the start of the variable name
- `end` - the type must be at the end of the variable name
- `natural` - the type must be at the natural position of the variable name
  (start for consts, end for classes, etc.)

### oneLetter

<sub>(default: `false`)</sub>

If true, the type must be a single letter (e.g. `cName` for a const, `eName` for
an enum, etc.). Classes get `k`, not to be confused with consts.

## 🔧 Config

```js
{ rules: { 'ninja/declare-keyword': [2, { side: 'start', oneLetter: false }] } }
```

## 🔗 See also

- [Enforce that interface names do not begin with an I](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-that-interface-names-do-not-begin-with-an-i)
- [Require that interface names be prefixed with I](https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/interface-name-prefix.md)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
