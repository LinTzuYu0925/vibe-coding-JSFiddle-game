<script setup>
// A copyable AI prompt. Put the prompt text in the slot; mark the parts students fill in with <Ph>.
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
.prompt { border: 4px solid var(--neon); background: #0c1130; box-shadow: 6px 6px 0 #000; }
.head { display: flex; justify-content: space-between; align-items: center; background: var(--neon); color: #000; font-weight: 900; font-size: .95rem; padding: .2rem .6rem; }
button { background: #000; color: var(--neon); font-weight: 900; font-size: .8rem; padding: .1rem .6rem; cursor: pointer; }
.body { padding: .5rem .8rem; font-size: .95rem; line-height: 1.55; }
</style>
