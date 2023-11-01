# FAQ

### What is `dont`?

`dont` is an acronym.

### What does it do?

`eslint-plugin-ninja` is a collection of state-of-the-art ESLint rules that will
help you write better code.

### Who wrote this?

[I](https://github.com/lzear) did. But most of the code is stolen from other
ESLint plugins
([perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist),
[unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn), …)

### How do I use it?

Install it:

```sh
npm install --save-dev eslint eslint-plugin-ninja
```

Add it to your `.eslintrc` or `eslint.config.js`:

::: code-group

```json [.eslintrc]
// .eslintrc
{
  "plugins": ["ninja"],
  "rules": {
    "ninja/emoji": 2
  }
}
```

```js [Flat config: eslint.config.js - recommended rules]
// eslint.config.js
import ninja from 'eslint-plugin-ninja'

export default [ninja]
```

```js [Flat config: eslint.config.js - custom rules]
// eslint.config.js
import ninja from 'eslint-plugin-ninja'

export default [
  {
    plugins: { ninja },
    rules: {
      'ninja/emoji': 2,
    },
  },
]
```

:::

### Something is broken, what do I do? Can I also suggest a rule?

You can open [issues](https://github.com/azat-io/eslint-plugin-ninja/issues) or
[pull requests](https://github.com/azat-io/eslint-plugin-ninja/pulls). You can
also not do that, and spend your time on more useful things.

### Do you recommend using this in my projects or at my workplace?

dont
