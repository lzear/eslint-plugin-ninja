import lightningcss from 'vite-plugin-lightningcss'
import { defineConfig } from 'vitepress'

import {
  contributing,
  description,
  repository,
  changelog,
  keywords,
  homepage,
  version,
  title,
  image,
} from './meta'
import plugin from '../index'

let links: { lastmod?: number; url: string }[] = []

let { configs, rules } = plugin

export default defineConfig({
  srcDir: 'docs',
  base: '/',
  title,
  description,
  head: [
    [
      'meta',
      {
        name: 'theme-color',
        content: '#1e1e20',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        sizes: 'any',
        href: '/favicon.ico',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: 'Elzéar',
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: keywords.join(', '),
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: title,
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: homepage,
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: image,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:title',
        content: title,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:creator',
        content: '@_lzear',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: image,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/favicon.svg',
        color: '#252529',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
    [
      'script',
      {
        async: '',
        src: 'https://plausible.io/js/script.js',
        'data-domain': "dont.ninja"
      },
    ],
  ],

  lastUpdated: true,

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  themeConfig: {
    logo: '/logo.svg',

    search: {
      provider: 'local',
    },

    nav: [
      {
        text: 'FAQ',
        link: '/faq/',
        activeMatch: '^/faq/',
      },
      {
        text: 'Rules',
        link: '/rules/',
        activeMatch: '^/rules/',
      },
    ],

    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Getting Started',
              link: '/guide/getting-started',
            },
            {
              text: 'FAQ',
              link: '/faq/',
            },
          ],
        },
        {
          text: 'Rules',
          link: '/rules/',
          items: Object.keys(rules).map(rule => ({
            text: rule,
            link: `/rules/${rule}`,
          })),
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: repository,
      },
    ],

    editLink: {
      pattern: `${repository}/tree/main/docs/:path`,
      text: 'Suggest changes to this page',
    },

    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © Azat S.',
    },
  },

  cleanUrls: true,

  vite: {
    plugins: [lightningcss()],
  },

  transformHtml: (_, id, { pageData }) => {
    if (!/[/\\]404\.html$/.test(id)) {
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated,
      })
    }
  },

  sitemap: {
    hostname: 'https://www.dont.ninja/',
  },
})
