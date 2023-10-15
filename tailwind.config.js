/* eslint-disable unicorn/prefer-module */

module.exports = {
  // purge: {
  //   content: [
  //     './.vitepress/**/*.js',
  //     './.vitepress/**/*.vue',
  //     './.vitepress/**/*.ts',
  //   ],
  //   options: {
  //     safelist: ['html', 'body'],
  //   },
  //   // enabled: process.env.NODE_ENV === 'production',
  // },
  content: [
    './.vitepress/**/*.js',
    './.vitepress/**/*.vue',
    '.vitepress/**/*.vue',
    './.vitepress/**/*.ts',
  ],

  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    darkTheme: 'dark', // name of one of the included themes for dark mode
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    prefix: 'dui-', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    styled: true, // include daisyUI colors and design decisions for all components
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    utils: true, // adds responsive and modifier utility classes
  },
  plugins: [require('daisyui')],
  // fontFamily: {
  //   mono: '"Comic Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  // },

  theme: {
    extend: {
      fontFamily: {
        mono: '"Comic Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },
    },
    // fontFamily: {
    //   mono: '"Comic Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    // },
  },
}
