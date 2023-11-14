---
title: no-rush
description: No rush
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText, fakeLint} from '../../src/sample-code/no-rush';
</script>

> "Sometimes, the most productive thing you can do is wait." - Unknown

# Enforce a delay (`no-rush`)

💼⚠️ This rule is enabled in the 🌐 `all` [config](/configs/). This rule _warns_
in the ✅ `recommended` [config](/configs/).

<!-- end auto-generated rule header -->

## 📖 Rule details

Slowing down can sometimes lead to more thoughtful and considered decisions,
ensuring you're not rushing through critical processes or checks.

## ⚙️ Options

### delay

Time to wait, in seconds.

## 🔧 Config

```js
// wait 10 seconds
{ rules: {'ninja/no-rush': [2, { delay: 10 }] } }
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" :fakeLint="fakeLint" />
