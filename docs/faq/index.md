# FAQ

### What is `dont`?

`dont` is an acronym.

### What does it do?

`eslint-plugin-dont` is a collection of state-of-the-art ESLint rules that will help you write better code.

### How do I use it?

Install it:

```sh
npm install --save-dev eslint eslint-plugin-dont
```

Add it to your `.eslintrc` or `eslint.config.js`:

::: code-group

```json [.eslintrc]
// .eslintrc
{
  "plugins": [
    "dont"
  ],
  "rules": {
    "dont/emoji": 2
  }
}
```

```js [Flat config: eslint.config.js - recommended rules]
// eslint.config.js
import dont from 'eslint-plugin-dont'

export default [
  dont,
]
```

```js [Flat config: eslint.config.js - custom rules]
// eslint.config.js
import dont from 'eslint-plugin-dont'

export default [
  {
    plugins: {dont},
    rules: {
      'dont/emoji': 2,
    },
  }
]
```

:::

### Something is broken, what do I do?

Ideally, just spend your time doing something interesting or useful. If you don't want to, you can open an issue or PR
on [GitHub](https://github.com/lzear/eslint-plugin-dont).

### Can I also suggest a rule?

Sure.

### Do you recommend using this in my projects or at my workplace?

`dont`
