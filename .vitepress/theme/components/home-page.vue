<script lang="ts" setup>
import {VPTeamMembers, VPHomeFeatures} from 'vitepress/theme'
import {computed, onMounted, ref} from 'vue'
import CodeSamples from "./code-samples.vue";
import CodeSamplesAlign from "./code-samples-align.vue";
import CodeSamplesJustify from "./code-samples-justify.vue";
import CodeSamplesJustify2 from "./code-samples-justify2.vue";

let twitterAzat = ref('https://twitter.com/azat_io_en')

let members = computed(() => [
  {
    avatar: 'https://github.com/lzear.png',
    name: 'lzear',
    title: 'Author of eslint-plugin-dont',
    links: [
      {icon: 'github', link: 'https://github.com/lzear',},
      {icon: 'twitter', link: 'https://twitter.com/_lzear',},
    ],
  },
  {
    avatar: 'https://github.com/azat-io.png',
    name: 'Azat S.',
    title: 'Author of eslint-plugin-perfectionist, which this project is forked from',
    links: [
      {
        icon: 'github',
        link: 'https://github.com/azat-io',
      },
      {
        icon: 'twitter',
        link: twitterAzat.value,
      },
    ],
  },
])

onMounted(() => {
  let checkUserLang = (language: string | string[]): boolean => {
    let userLang = window.navigator.language.substring(0, 2)
    let checkLang = (lang: string): boolean => lang === userLang
    if (typeof language === 'string') {
      return checkLang(language)
    }
    return language.some(lang => checkLang(lang))
  }

  if (checkUserLang(['ru', 'uk', 'be'])) {
    twitterAzat.value = 'https://twitter.com/azat_io'
  }
})
</script>

<template>
  <div class="px-4 md:px-16 max-w-[1170px] m-auto">
    <CodeSamples />
    <hr class="divider"/>

    <h2>
      20+ rules, including…
    </h2>
    <div class="saamples">
    <CodeSamplesAlign />
    <CodeSamplesJustify2 />
    <CodeSamplesJustify />
      </div>

    <hr class="divider"/>

    <h2>
      By
    </h2>
    <VPTeamMembers class="members flex flex-wrap m-auto max-w-[100%]" :members="members" size="small"/>
  </div>
</template>

<style scoped>
.saamples {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 35px;
}
h2 {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var( --vp-font-family-mono);
  text-align: center;
  margin-bottom: 20px;
}
.divider {
  inline-size: 100%;
  block-size: 1px;
  max-inline-size: 1152px;
  margin: 48px auto;
  border: 1px solid var(--vp-c-divider);
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  max-inline-size: 1152px;
  margin: 0 auto;
}

.code-blocks {
  display: none;
}

.members {
  inline-size: fit-content;
}

@media (width >= 640px) {
  .container {
    padding-inline: 48px;
  }
}

@media (width >= 960px) {
  .container {
    padding-inline: 64px;
  }

  .content {
    grid-template-columns: auto 1fr;
    inline-size: 100%;
  }

  .code-blocks {
    display: flex;
    max-block-size: 100%;
  }

  .code-wrapper {
    position: relative;
    z-index: 1;
    display: block;
    inline-size: calc(50% + 16px);
    overflow: hidden;
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
    block-size: auto;
  }

  .code-caption {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    padding-inline: 24px;
    font-family: var(--vp-font-family-mono);
    font-size: 12px;
    color: var(--vp-button-brand-text);
    background: var(--vp-c-brand);
    border-end-end-radius: 12px;
  }

  .code-wrapper svg {
    position: absolute;
    inset: 24px;
    inline-size: calc(100% - 24px * 2);
    block-size: calc(100% - 24px * 2);
  }

  .code-wrapper-left {
    margin-block-end: 24px;
    opacity: 80%;
  }

  .code-wrapper-right {
    margin-block-start: 24px;
    margin-inline-start: -32px;
    box-shadow: 0 3px 8px 0 var(--vp-c-bg-soft-down);
  }
}
</style>
