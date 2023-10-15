---
title: tab
description: Use tabs to separate words in the code
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/tab.js';
</script>

> "I just think it's weird that you use spaces instead of tabs." — Richard Hendricks

# Require word separators to be tabs, not spaces (`dont/tab`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

Tabs are better than spaces. However and unfortunately, most developers still use spaces to separate words.

## 💡 Examples

```js
// ❌ Incorrect
if (a) {
  b = c;
  function foo(d) {
    e = f;
  }
}

// ✅ Correct
if	(a)	{
		b	=	c;
		function	foo(d)	{
				e	=	f;
		}
}
```

## 🔧 Config

```js
{ rules: { 'dont/tab': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
