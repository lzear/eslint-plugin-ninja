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

Next, install `eslint-plugin-dont`:

::: code-group

```bash [npm]
npm install --save-dev eslint-plugin-dont
```

```bash [pnpm]
pnpm add --save-dev eslint-plugin-dont
```

```bash [yarn]
yarn add --dev eslint-plugin-dont
```

:::

## ⚙️ Usage

Add `dont` to the plugins section of your `.eslintrc` configuration file or
import `eslint-plugin-dont` in your `eslint.config.js`. Then configure the rules
you want to use under the rules section.

### Legacy Config

```json
// .eslintrc
{
  "plugins": ["dont"],
  "rules": {
    "dont/emoji": 2
  }
}
```

### Flat Config

```js
// eslint.config.js
import dont from 'eslint-plugin-dont'

export default {
  plugins: {
    dont,
  },
  rules: {
    'dont/emoji': 'error',
  },
}
```
