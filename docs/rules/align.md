---
title: center
description: Align text elegantly
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText} from '../../src/sample-code/align.js';
</script>

> "Typography is two-dimensional architecture, based on experience and
> imagination, and guided by rules and readability." — Hermann Zapf

# Enforce elegant text alignment (`align`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅
`recommended`.

🔧 This rule is automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule details

<div style="text-align: center;">
While traditionalists might find the idea of center or right-aligned code unconventional, many innovations in software
development were once deemed unorthodox. It's important to keep an open mind, recognizing that seemingly aesthetic
choices can have deeper implications for cognition, creativity, and code readability. For developers accustomed to
right-aligned languages like Arabic or Hebrew, this alignment might feel more intuitive, bridging the gap between
natural linguistic processing and coding.
</div>

## 💡 Examples

::: code-group

<!-- prettier-ignore -->
```js [Center]
   // ✅ Correct
     if (a) {
      b = c;
function foo(d) {
      e = f;
        }
        }
```

<!-- prettier-ignore -->
```js [Right]
     // ✅ Correct
         if (a) {
           b = c;
function foo(d) {
           e = f;
                }
                }
```

<!-- prettier-ignore -->
```js [Left]
// ✅ Correct
if (a) {
b = c;
function foo(d) {
e = f;
}
}
```

<!-- prettier-ignore -->
```js [RTL Indent]
       // ✅ Correct
           if (a) {
           b = c;
function foo(d) {
         e = f;
                }
                  }
```

<!-- prettier-ignore -->
```js [LTR Indent]
// ✅ Correct
if (a) {
  b = c;
  function foo(d) {
    e = f;
  }
}
```

:::

## ⚙️ Options

### side

<sub>(default: `'center'`)</sub>

- `left`
- `center`
- `rigth`
- `rtlIndent`
- `ltrIndent`

## 🔧 Config

```js
{ rules: { 'ninja/align': [2, { side: 'center' }] } }
```

## 🔗 See also

- [justify2](/rules/justify2)

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
