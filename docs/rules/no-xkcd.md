---
title: yes
description: Allow all
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/no-xkcd.js';
</script>

> "Originality is the best form of rebellion." – Mike Sasso


# Disallow xkcd references (`dont/no-xkcd`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

`xkcd` is great and all, but references to it are overused!
Also, you're not edgy or teaching anyone anything. Everybody and their grandma is reading it, and we've all seen that
comic a billion times, especially #927 (you already know which one I'm talking about).

On exception for https://xkcd.com/2832 which is allowed because fuck cars.

## 💡 Examples

```js
// ❌ Incorrect
// lol xkcd/3241
const woof = 'woof'

// ✅ Correct
// lol it's nonsense
const woof = 'woof'
```

## 🔧 Config

```js
{ rules: { 'dont/no-xkcd': 2 } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
