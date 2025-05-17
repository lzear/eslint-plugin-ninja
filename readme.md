# ESLint Plugin Ninja

[![Version](https://img.shields.io/npm/v/eslint-plugin-ninja.svg?color=b5749d)](https://www.npmjs.com/package/eslint-plugin-ninja)
[![GitHub license](https://img.shields.io/badge/license-MIT-b5749d.svg)](https://github.com/lzear/eslint-plugin-ninja/blob/main/license)

The ultimate ESLint plugin.

### eslint-ninja.vercel.app

```js
     // Make your code look like this!
         import 👈 from 'left-pad'
         import 🎭 from 'is-even'

               let ✋ = '1'
            let 🔥 = +👈(✋++, ✋)
       let 🌈 = 🔥++ + ++✋ + +🎭(++🔥)
            let 🌯 = 🌈 + 🔥 * 🖐️

// 12% of the people can't solve this! 😂
       console.log(👈(✋, 🌯, 🌈) + 1)
```

## 🚀 Install

```shell
npm i -D eslint-plugin-ninja
```

```json
{
  "plugins": ["ninja"],
  "extends": ["plugin:ninja/recommended"],
  "rules": {
    "ninja/align": 2,
    "ninja/prefer-emoji": 1
  }
}
```

## ✅ Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the
[`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                     | Description                                               | 🔧 |
|:-----------------------------------------------------------------------------------------|:----------------------------------------------------------|:---|
| [align](https://eslint-ninja.vercel.app/rules/align)                                     | enforce elegant text alignment                            | 🔧 |
| [declare-keyword](https://eslint-ninja.vercel.app/rules/declare-keyword)                 | enforce variable names to include their type              | 🔧 |
| [justify](https://eslint-ninja.vercel.app/rules/justify)                                 | enforce comments explaining code                          | 🔧 |
| [justify2](https://eslint-ninja.vercel.app/rules/justify2)                               | enforce text to be justified                              | 🔧 |
| [lottery](https://eslint-ninja.vercel.app/rules/lottery)                                 | require luck                                              |    |
| [monopoly](https://eslint-ninja.vercel.app/rules/monopoly)                               | disallow bad eslint configs                               | 🔧 |
| [no](https://eslint-ninja.vercel.app/rules/no)                                           | disallow everything                                       |    |
| [no-avoidable-loop](https://eslint-ninja.vercel.app/rules/no-avoidable-loop)             | disallow useless `for` loops                              | 🔧 |
| [no-ci](https://eslint-ninja.vercel.app/rules/no-ci)                                     | disallow running on CI lol                                |    |
| [no-no-plusplus](https://eslint-ninja.vercel.app/rules/no-no-plusplus)                   | enforce the unary operators ++ and --                     | 🔧 |
| [no-object](https://eslint-ninja.vercel.app/rules/no-object)                             | disallow object literals, prefer Map                      | 🔧 |
| [no-overtime](https://eslint-ninja.vercel.app/rules/no-overtime)                         | disallow overwork                                         |    |
| [no-random](https://eslint-ninja.vercel.app/rules/no-random)                             | disallow non-deterministic randomness                     | 🔧 |
| [no-rush](https://eslint-ninja.vercel.app/rules/no-rush)                                 | enforce a delay                                           |    |
| [no-ts](https://eslint-ninja.vercel.app/rules/no-ts)                                     | disallow gymnastics needed to please the TS compiler      | 🔧 |
| [no-woof](https://eslint-ninja.vercel.app/rules/no-woof)                                 | disallow woof!                                            | 🔧 |
| [no-xkcd](https://eslint-ninja.vercel.app/rules/no-xkcd)                                 | disallow xkcd references                                  | 🔧 |
| [optimize-string-ternary](https://eslint-ninja.vercel.app/rules/optimize-string-ternary) | disallow repetition when building strings with ternaries  | 🔧 |
| [prefer-emoji](https://eslint-ninja.vercel.app/rules/prefer-emoji)                       | require variables and properties to be named using emojis | 🔧 |
| [prefer-npm](https://eslint-ninja.vercel.app/rules/prefer-npm)                           | require from npm instead of using JS builtins             | 🔧 |
| [prefer-tab](https://eslint-ninja.vercel.app/rules/prefer-tab)                           | require word separators to be tabs, not spaces            | 🔧 |
| [quine](https://eslint-ninja.vercel.app/rules/quine)                                     | enforce quine                                             |    |
| [yes](https://eslint-ninja.vercel.app/rules/yes)                                         | enforce nothing                                           |    |

<!-- end auto-generated rules list -->

## 🔒 License

MIT &copy; [Azat S.](https://azat.io)
