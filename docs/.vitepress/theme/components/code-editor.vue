<template>
  <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="change($event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
  />
  <p v-if="loading">Loading...</p>
  <pre v-else-if="lintResult">{{ prettifyJSON(lintResult) }}</pre>
</template>

<script setup>
import {defineProps, ref, shallowRef} from 'vue'
import {debounce} from 'lodash'
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {oneDark} from '@codemirror/theme-one-dark'

const lintResult = ref(null)
const loading = ref(false)

const {rule, text} = defineProps({
  rule: String,
  text: String,
})

const code = ref(text || `console.log('Hello, world!')`)
const extensions = [javascript(), oneDark]

const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

const debouncedFetch = debounce(async (code) => {
  loading.value = true
  const payload = {code, rule, level: 'error'}
  const r = await fetch('/api/lint', {method: 'POST', body: JSON.stringify(payload)})
  lintResult.value = await r.json()
  loading.value = false
}, 1000)

const change = (code) => debouncedFetch(code)
change(code.value)

const log = console.log

const prettifyJSON = (value) => JSON.stringify(value, null, 2)
</script>
