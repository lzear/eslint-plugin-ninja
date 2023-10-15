<template>
  <Suspense>
    <template #default>
      <CodeEditor v-bind="props"/>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import CodeEditor, {LintResult} from './code-editor-inner.vue';
import {PropType} from 'vue';

const props = defineProps({
  rule: String,
  text: String,
  presetConfigs: {
    type: Array as PropType<{ name: string, config: unknown }[]>,
    items: {name: String, type: Object,},
  },
  fakeLint: { type: Function as unknown as () =>( undefined |( (code: string, options: unknown) => Promise<LintResult> )), default: undefined}
});
</script>
