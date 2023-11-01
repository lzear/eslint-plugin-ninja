---
title: justify2
description:
  Adjusted word-spacing so that the text falls flush with both margins
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/justify2.js';
</script>

> "From the beginning men used God to justify the unjustifiable." — Salman
> Rushdie

# Enforce text to be justified (`justify2`)

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 💡 Examples

```js
// ❌ Incorrect
if (a) {
  b = c
  function foo(d) {
    e = f
  }
}

// ✅ Correct
if (a) {
  b = c
  function foo(d) {
    e = f
  }
}
```

## 🔧 Config

```js
{ rules: { 'ninja/justify2': 2 } }
```

## 🔗 See also

- [align](/rules/align)
- [justify](/rules/justify)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
