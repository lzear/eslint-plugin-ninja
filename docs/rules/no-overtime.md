---
title: no-overtime
description: disallow work outside working hours
---

<script setup lang="ts">
import CodeEditor from '../../.vitepress/theme/components/code-editor.vue';
import {ruleName, presetConfigs, initialText, fakeLint} from '../../src/sample-code/no-overtime.js';
</script>

> "It's not the hours you put in your work that counts, it's the work you put in
> the hours." — Sam Ewing

# Disallow overwork (`no-overtime`)

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅
`recommended`.

<!-- end auto-generated rule header -->

## 📖 Rule details

Prevent commits done outside working hours.

## ⚙️ Options

### workdays

What days of the week are workdays. Defined in ISO 8601 format, where 1 is
Monday and 7 is Sunday. Defaults to 1-5 (Monday to Friday).

### start

What time the workday starts. Format is `HH:mm:ss`. Defaults to `08:00:00`.

### end

What time the workday ends. Format is `HH:mm:ss`. Defaults to `18:00:00`.

## 🔧 Config

```json
{
  "ninja/no-overtime": [
    "error",
    {
      "workdays": [1, 2, 3, 4, 5],
      "start": "08:00:00",
      "end": "18:00:00"
    }
  ]
}
```

## 🧑‍💻 Demo

<CodeEditor :rule="ruleName" :text="initialText" :presetConfigs="presetConfigs" />
