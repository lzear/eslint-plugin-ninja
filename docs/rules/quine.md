---
title: quine
description: Enforce quines
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, initialText} from '../../src/sample-code/quine';
</script>

> "This sentence contains thirty-six characters."

# Enforce quines (`quine`)

💼 This rule is enabled in the 🌐 `all` [config](/configs/).

<!-- end auto-generated rule header -->

## 💡 Examples

::: code-group

<!-- prettier-ignore -->
```js [Center]
// ✅ Correct
($=_=>`($=${$})()`)()
```

<!-- prettier-ignore -->
```js [Right]
// ✅ Correct
( function quine() {console.log("( " + quine.toString() + " )()")} )()
```

:::

## 🔧 Config

```js
{ rules: { 'ninja/quine': 2 } }
```
