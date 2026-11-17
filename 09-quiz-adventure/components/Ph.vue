<script setup>
// A blank inside a <PromptBox>. Students fill it ON THE SLIDE; it turns green when properly filled,
// and PromptBox's 📋 button copies the whole prompt with what they filled in.
//   <Ph>怎麼玩來檢查？</Ph>                 text box (green when not empty)
//   <Ph number>幾</Ph>                      number box (green when it holds a number)
//   <Ph pick="保持翻開|蓋回去" answer="保持翻開" />   dropdown (green when the answer is chosen; without
//                                           `answer`, any choice is green)
//   <Ph code>貼上 JSFiddle 最新的 JavaScript</Ph>    box for the student's whole JavaScript (green when it looks like code)
// An unfilled blank is copied as 【hint】, so the AI still gets a readable sentence.
import { ref, computed, inject, useSlots, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import { activeBlank } from '../fill-store.js'

const props = defineProps({
  pick: { type: String, default: '' },
  answer: { type: String, default: '' },
  number: { type: Boolean, default: false },
  code: { type: Boolean, default: false },
})
const slots = useSlots()
const hint = (slots.default?.() ?? []).map(n => (typeof n.children === 'string' ? n.children : '')).join('').trim()
const options = props.pick.split('|').map(s => s.trim()).filter(Boolean)
const kind = options.length ? 'pick' : props.code ? 'code' : props.number ? 'number' : 'text'

const value = ref('')
const ok = computed(() => {
  const v = value.value.trim()
  if (kind === 'pick') return props.answer ? v === props.answer : v !== ''
  if (kind === 'number') return /^\d+(\.\d+)?$/.test(v)
  if (kind === 'code') return v.split('\n').length >= 5 && /function|=>|const |let /.test(v)
  return v !== '' && v !== hint
})
const wrong = computed(() => kind === 'pick' && props.answer && value.value && !ok.value)
const fallback = kind === 'pick' ? `【選一個：${options.join('／')}】` : `【${hint}】`
const lines = computed(() => value.value.split('\n').length)

// register with the PromptBox (counts unfilled blanks, builds the copied text)
// box.flash is bumped when 📋 is pressed with unfilled blanks: an unfilled box then blinks.
const box = inject('fill', null)
const flashing = ref(false)
if (box) watch(box.flash, () => {
  if (ok.value) return
  flashing.value = false
  requestAnimationFrame(() => { flashing.value = true })
  setTimeout(() => { flashing.value = false }, 1800)
})
const index = box ? box.add({ ok, code: kind === 'code', text: () => value.value.trim() || fallback }) : 0

// keep answers while the student moves between slides (not the code: it must always be the latest)
const { $page } = useSlideContext()
const key = `fill:${$page.value}:${index}`
if (kind !== 'code') {
  try { value.value = sessionStorage.getItem(key) ?? '' } catch {}
  watch(value, v => { try { sessionStorage.setItem(key, v) } catch {} })
}

function focus() {
  if (kind === 'text') activeBlank.value = { page: $page.value, append: w => { value.value = value.value.trim() ? `${value.value.trim()}、${w}` : w } }
}
// width follows the content: Chinese characters ≈ 1em, others ≈ .6em
const width = computed(() => {
  const s = value.value || hint
  const em = [...s].reduce((n, c) => n + (c.charCodeAt(0) > 255 ? 1 : 0.6), 0)
  return `${Math.min(Math.max(em + 1.4, 3), 22)}em`
})
</script>

<template>
  <span v-if="kind === 'pick'" class="ph" :class="{ ok, wrong, flash: flashing }">
    <select v-model="value" data-fill @keydown.stop>
      <option value="" disabled>選一個 ▾</option>
      <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
    </select><span v-if="wrong" class="tip">✗ 再看一次目標頁</span>
  </span>
  <span v-else-if="kind === 'code'" class="ph code" :class="{ ok, flash: flashing }">
    <textarea v-model="value" data-fill rows="1" spellcheck="false" :placeholder="`點這裡 → Ctrl+V 貼上程式`" @keydown.stop></textarea>
    <span v-if="ok" class="tip ok">✅ 已貼上 {{ lines }} 行</span>
  </span>
  <span v-else class="ph" :class="{ ok, flash: flashing }">
    <input v-model="value" data-fill :inputmode="kind === 'number' ? 'numeric' : 'text'" :placeholder="hint"
      :style="{ width }" spellcheck="false" @focus="focus" @keydown.stop>
  </span>
</template>

<style scoped>
.ph { display: inline; }
input, select, textarea {
  font: inherit; font-weight: 900; color: #000; background: var(--pink);
  border: 2px solid #000; padding: 0 .25rem; line-height: 1.25; box-shadow: 2px 2px 0 #000; vertical-align: baseline;
}
input::placeholder, textarea::placeholder { color: #0009; font-weight: 700; }
input:focus, select:focus, textarea:focus { outline: 3px solid var(--yellow); }
select { cursor: pointer; }
option { background: #fff; color: #000; }
.ok input, .ok select, .ok textarea { background: var(--green); }
.wrong select { background: var(--orange); }
.code textarea { width: 70%; height: 1.6rem; resize: none; overflow: hidden; white-space: nowrap; font-size: .95rem; vertical-align: middle; }
.tip { margin-left: .3rem; font-size: 1rem; color: var(--pink); }
.tip.ok { color: var(--green); }
/* blinks when 📋 was pressed while this box is not filled properly */
.flash input, .flash select, .flash textarea { animation: blink .45s 4; }
@keyframes blink { 50% { outline: 4px solid var(--yellow); box-shadow: 0 0 16px var(--yellow); transform: scale(1.08); } }
</style>
