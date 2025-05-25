// @ts-ignore
import type { Theme } from 'vitepress'

import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
// @ts-ignore
import DefaultTheme from 'vitepress/theme'
import '@fontsource/comic-mono/700.css'
import '@fontsource/comic-mono'
import { h } from 'vue'

import HomePage from './components/home-page.vue'
import './tailwind.css'
import './stuff.css'
import './vars.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(HomePage),
    }),
}

export default theme
