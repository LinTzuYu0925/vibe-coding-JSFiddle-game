<script setup>
// One of the teacher's fiddles for this class, as a clickable link.
// ⚠️ TEACHER: fill the addresses in ../fiddles.json (the only place). The same addresses are written into the
//    speaker notes wherever a note says [[fiddle:<key>]] (setup/preparser.ts).
//   <Fiddle k="rescue1" />          keys: starter, full, rescue1, rescue2, rescue3
import FIDDLES from '../fiddles.json'

const props = defineProps({ k: { type: String, required: true } })
// strip any https:// and trailing slash, so the slide shows a short address and the link never doubles https://
const url = String(FIDDLES[props.k] ?? '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '')
</script>

<template>
  <a v-if="url" class="fiddle" :href="`https://${url}`" target="_blank" rel="noopener">{{ url }}</a>
  <code v-else class="fiddle todo">jsfiddle.net/（老師課前填入）</code>
</template>

<style scoped>
.fiddle { font-family: ui-monospace, Consolas, monospace; color: var(--neon); background: #ffffff14; padding: 0 .3em; border-bottom: 2px solid var(--neon); }
.todo { color: var(--pink); border-bottom-color: var(--pink); }
</style>
