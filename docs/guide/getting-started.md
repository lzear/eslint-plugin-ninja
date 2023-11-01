---
title: Getting Started
---

# Getting Started

## 💿 Installation

You'll first need to install [ESLint](https://eslint.org):

::: code-group

```bash [npm]
npm install --save-dev eslint
```

```bash [pnpm]
pnpm add --save-dev eslint
```

```bash [yarn]
yarn add --dev eslint
```

:::

Next, install `eslint-plugin-ninja`:

::: code-group

```bash [npm]
npm install --save-dev eslint-plugin-ninja
```

```bash [pnpm]
pnpm add --save-dev eslint-plugin-ninja
```

```bash [yarn]
yarn add --dev eslint-plugin-ninja
```

:::

## ⚙️ Usage

Add `ninja` to the plugins section of your `.eslintrc` configuration file or
import `eslint-plugin-ninja` in your `eslint.config.js`. Then configure the rules
you want to use under the rules section.

### Legacy Config

```json
// .eslintrc
{
  "plugins": ["ninja"],
  "rules": {
    "ninja/emoji": 2
  }
}
```

### Flat Config

```js
// eslint.config.js
import ninja from 'eslint-plugin-ninja'

export default {
  plugins: {
    ninja,
  },
  rules: {
    'ninja/emoji': 'error',
  },
}
```
