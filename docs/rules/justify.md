---
title: justify
description: Describe your code so it's readable
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/justify.js';
</script>

> "The end may justify the means as long as there is something that justifies
> the end." — Leon Trotsky

# Enforce comments explaining code (`justify`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅
`recommended`.

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Every line of code should be accompanied by a comment. Not all readers possess
the same experience or context as you. Well-placed comments can save hours for
both future you and others, aiding in faster comprehension.

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
// if a
if (a) {
  // then assign c to b
  b = c

  // define foo
  function foo(d) {
    // assign f to e
    e = f
  }
}
```

## 🔧 Config

```js
{ rules: { 'ninja/justify': 2 } }
```

## 🔗 See also

- [justify2](/rules/justify2)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
