<script setup>
// The teacher's fiddles for this class, as a clickable link.
// ⚠️ TEACHER: this is the ONLY place to fill in. After creating each fiddle (see NOTES.md, prep checklist),
//    paste its address here, with or without https:// (both work), e.g. 'jsfiddle.net/k3x9ab2q/0'.
//    Empty = shows 「老師課前填入」.
const FIDDLES = {
  starter: 'https://jsfiddle.net/xmrywgej/', // 起始遊戲  (starter/memory-match-0.html)
  rescue1: 'https://jsfiddle.net/kzL0h58m/', // 救援 1：點一下就翻牌 (starter/rescue-1.html)
  rescue2: 'https://jsfiddle.net/a472pL6c/', // 救援 2：翻兩張比一比 (starter/rescue-2.html)
  rescue3: 'https://jsfiddle.net/jn9ermg7/1/', // 救援 3：完整版，也是第 2 頁老師玩的遊戲 (starter/rescue-3.html)
}
const props = defineProps({ k: { type: String, required: true } })
// strip any https:// and trailing slash, so the slide shows a short address and the link never doubles https://
const url = (FIDDLES[props.k] ?? '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '')
</script>

<template>
  <a v-if="url" class="fiddle" :href="`https://${url}`" target="_blank" rel="noopener">{{ url }}</a>
  <code v-else class="fiddle todo">jsfiddle.net/（老師課前填入）</code>
</template>

<style scoped>
.fiddle { font-family: ui-monospace, Consolas, monospace; color: var(--neon); background: #ffffff14; padding: 0 .3em; border-bottom: 2px solid var(--neon); }
.todo { color: var(--pink); border-bottom-color: var(--pink); }
</style>
