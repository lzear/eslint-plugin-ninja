---
title: Configs
description: ESLint Plugin Ninja list of configs
---

# Configs

The easiest way to use `eslint-plugin-ninja` is to use ready-made configs.
Config files use all the rules of the current plugin, but you can override them.

This plugin provides three configs out of the box.

See the
[ESLint docs](https://eslint.org/docs/latest/use/configure/configuration-files#extending-configuration-files)
for more information about extending config files.

| Name        | Description       |
| :---------- | :---------------- |
| recommended | half nonsense     |
| all         | complete nonsense |

## recommended

::: code-group

<!-- prettier-ignore -->
```json [Legacy Config]
// .eslintrc
{
  "plugin": ["ninja"],
  "extends": ["plugin:ninja/recommended"]
}
```

<!-- prettier-ignore -->
```js [Flat Config]
// eslint.config.js
import ninjadvised from 'eslint-plugin-ninja/configs/recommended'

export default [
  ninjadvised,
]
```

:::

## all

::: code-group

<!-- prettier-ignore -->
```json [Legacy Config]
// .eslintrc
{
  "plugin": ["ninja"],
  "extends": ["plugin:ninja/all"]
}
```

<!-- prettier-ignore -->
```js [Flat Config]
// eslint.config.js
import ninjall from 'eslint-plugin-ninja/configs/all'

export default [
  ninjall,
]
```

:::
