<script setup>
// A copyable AI prompt. Put the prompt text in the slot.
import { ref } from 'vue'

defineProps({ title: { type: String, default: '🤖 複製這段話給 AI' } })
const body = ref(null)
const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(body.value.innerText.trim())
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {}
}
</script>

<template>
  <div class="prompt">
    <div class="head">
      <span>{{ title }}</span>
      <button @click="copy">{{ copied ? '✅ 已複製' : '📋 複製' }}</button>
    </div>
    <div ref="body" class="body"><slot /></div>
  </div>
</template>

<style scoped>
.prompt { border: 3px solid var(--c-start); background: #f7faff; box-shadow: 5px 5px 0 #a9c1f6; border-radius: 6px; overflow: hidden; }
.head { display: flex; justify-content: space-between; align-items: center; background: var(--c-start); color: #fff; font-weight: 900; font-size: .95rem; padding: .2rem .7rem; }
button { background: #fff; color: var(--c-start); font-weight: 900; font-size: .8rem; padding: .1rem .6rem; cursor: pointer; border-radius: 4px; }
.body { padding: .45rem .8rem; font-size: .92rem; line-height: 1.5; color: var(--ink); }
.body :deep(p) { margin: .15rem 0; }
.body :deep(ol) { margin: .1rem 0 .1rem 1.3rem; padding: 0; list-style: decimal; }
.body :deep(li) { padding: 0; line-height: 1.45; }
</style>
