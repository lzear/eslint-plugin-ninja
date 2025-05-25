<template>
  <div class="flex gap-2 flex-col">
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px', fontFamily: '\'Comic Mono\'' }"
      :autofocus="false"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="change($event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />

    <!--
        flex-direction: row-reverse;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        justify-content: space-between;
        justify-content: space-between;-->
    <div class="flex justify-between flex-row-reverse items-start">
      <div
        v-if="presetConfigs?.length"
        class="flex flex-wrap justify-end gap-2 items-center"
      >
        <span class="text-gray-500">Options:</span>
        <button
          v-for="presetConfig in presetConfigs"
          :key="presetConfig.name"
          class="rounded-xl! px-2!"
          :class="isActive(presetConfig) ? 'bg-purple-600!' : 'bg-purple-500!'"
          @click="setConfig(presetConfig)"
        >
          {{ presetConfig.name }}
        </button>
      </div>

      <span
        v-if="loading"
        className="loading loading-spinner loading-md"
      ></span>
      <button
        v-else-if="canFix"
        class="bg-green-800! px-2! text-yellow-200! rounded-xl!"
        @click="applyFix"
      >
        Fix all fixable errors
      </button>
    </div>

    <h5
      v-if="!loading && lintResult?.verify?.length === 0"
      :class="loading ? 'opacity-40' : ''"
    >
      ✅ No errors
    </h5>
    <div
      v-if="!loading && lintResult?.verify?.length"
      class="flex flex-col"
      :class="loading ? 'opacity-40' : ''"
    >
      <h5>{{ lintResult?.verify?.length }} errors</h5>
      <div
        class="max-h-[320px] overflow-auto p-2 border-[1px] border-gray-400 text-xs font-mono"
      >
        <div v-for="msg in lintResult?.verify" class="flex gap-4">
          <div class="font-bold">{{ msg.line }}:{{ msg.column }}</div>
          <div class="flex-1 break-words break-all">{{ msg.message }}</div>
        </div>
      </div>
    </div>
    <div v-if="canFix && !loading" :class="loading ? 'opacity-40' : ''">
      <h5>Fix:</h5>
      <pre
        class="border-gray-400! p-4! text-xs! border-[1px]! overflow-auto! max-h-[320px]!"
        >{{ lintResult?.fix?.output }}</pre
      >
      <!--      // ?.replace(/ /g, '·').replace(/\t/g, '→')-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, shallowRef, onMounted } from 'vue'
import _ from 'lodash'

import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
// @ts-ignore
// import * as eslint from 'eslint/lib/linter'
import { PresetConfig } from '../../../src/sample-code/presets.js'
// import * as cm from 'vue-codemirror'
const pkg = await import('vue-codemirror')

const { Codemirror } = pkg

export type LintResult = {
  code: string
  fix: {
    output: string
  }
  verify: {
    ruleId: string
    severity: 2 | 1
    message: string
    line: number
    column: number
    nodeType: null
    messageId: string
    endLine: number
    endColumn: number
    fix?: {
      range: [number, number]
      text: string
    }
  }[]
}

const lintResult = ref<null | LintResult>(null)
const loading = ref(false)

const { rule, text, presetConfigs, fakeLint } = defineProps({
  rule: String,
  text: String,
  presetConfigs: {
    type: Array as PropType<{ name: string; config: unknown }[]>,
    items: { name: String, type: Object },
  },
  fakeLint: {
    type: Function as unknown as () =>
      | undefined
      | ((code: string, options: unknown) => Promise<LintResult>),
    default: undefined,
  },
})
const currentConfig = ref(presetConfigs?.[0]) // You can use this to track the current config, if needed

const code = ref(text || `console.log('Hello, world!')`)
const extensions = [javascript({ jsx: true, typescript: true }), oneDark]

const view = shallowRef()
const handleReady = payload => {
  view.value = payload.view
}

const debouncedFetch = _.debounce(
  async (code: string) => {
    loading.value = true
    if (fakeLint) {
      lintResult.value = await fakeLint(code, currentConfig?.value?.config)
      loading.value = false
      return
    }
    const payload = {
      code,
      rule,
      level: 'error',
      options: currentConfig?.value?.config,
    }
    const r = await fetch('/api/lint', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const rr = await r.json()
    lintResult.value = rr
    loading.value = false
  },
  fakeLint ? 200 : 1000,
)

const change = (code: string) => {
  loading.value = true
  debouncedFetch(code)
}
change(code.value)

const log = console.log

const applyFix = () => {
  const { fix } = lintResult.value
  code.value = fix.output
  change(code.value)
}

const canFix = computed(() => lintResult.value?.fix?.output !== code.value)

function setConfig(config: PresetConfig) {
  console.log(config)
  currentConfig.value = config
  change(code.value)
}

const isActive = computed(
  () => (config: PresetConfig) =>
    JSON.stringify(config?.config) ===
    JSON.stringify(currentConfig.value.config),
)
</script>
