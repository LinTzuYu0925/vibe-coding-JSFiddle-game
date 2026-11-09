<script setup>
// Word bank beside a prompt: each word is a button.
// If the student clicked a text box on this slide first, the word is added to that box;
// otherwise the word is copied (Ctrl+V it anywhere).
//   <Bank words="翻牌|比對|等 1 秒蓋回" />
import { ref, computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { activeBlank } from '../fill-store.js'

const props = defineProps({ words: { type: String, required: true } })
const list = computed(() => props.words.split('|').map(s => s.trim()).filter(Boolean))
const { $page } = useSlideContext()
const done = ref({ w: '', msg: '' })

async function use(w) {
  const target = activeBlank.value
  if (target && target.page === $page.value) {
    target.append(w)
    done.value = { w, msg: '✅ 已填入' }
  } else {
    try { await navigator.clipboard.writeText(w) } catch {}
    done.value = { w, msg: '✅ 已複製' }
  }
  setTimeout(() => { if (done.value.w === w) done.value = { w: '', msg: '' } }, 1000)
}
</script>

<template>
  <div class="bank">
    <button v-for="w in list" :key="w" :class="{ ok: done.w === w }" @mousedown.prevent @click="use(w)">
      {{ done.w === w ? done.msg : w }}
    </button>
  </div>
</template>

<style scoped>
.bank { display: flex; flex-wrap: wrap; gap: .3rem; margin: .2rem 0 .1rem; }
button {
  font: inherit; font-size: 1rem; line-height: 1.4; font-weight: 700; cursor: pointer;
  border: 2px solid var(--yellow); color: var(--yellow); background: #0c1130; padding: 0 .4rem;
}
button:hover { background: #2a2208; }
button.ok { border-color: var(--green); color: var(--green); }
</style>
