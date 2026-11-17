<script setup>
// A copyable AI prompt. Put the prompt text in the slot; mark the parts students fill in with <Ph>.
// Students fill the blanks on the slide; the 📋 button copies the whole prompt with their answers
// (an unfilled blank is copied as 【hint】).
// While a blank is not green the button is a pink ⚠️ warning. Pressing it then does NOT copy: it says what is
// missing and makes those boxes blink. Pressing again within 4 seconds copies anyway (so nobody gets stuck).
import { ref, reactive, computed, provide } from 'vue'

defineProps({ title: { type: String, default: '🤖 複製這段話給 AI' } })
const body = ref(null)
const copied = ref(false)

const blanks = reactive([]) // { ok: boolean (unwrapped computed), code: boolean, text(): string }, in page order
const flash = ref(0)
provide('fill', { add: b => blanks.push(b) - 1, flash })
const left = computed(() => blanks.filter(b => !b.ok && !b.code).length)
const needCode = computed(() => blanks.some(b => b.code && !b.ok))
const done = computed(() => !left.value && !needCode.value)
const missing = computed(() => left.value ? `還有 ${left.value} 格沒填好` : '還沒貼上程式')
const warned = ref(false)
let warnTimer = 0
const label = computed(() => {
  if (copied.value) return '✅ 已複製'
  if (done.value) return '📋 複製'
  if (warned.value) return '⚠️ 再按一次照樣複製'
  return `⚠️ 📋 複製（${left.value ? `還有 ${left.value} 格` : '還要貼程式'}）`
})

// Swap each box for a marker, read the text, then put the answers in (keeps line breaks in pasted code).
function promptText() {
  const clone = body.value.cloneNode(true)
  clone.querySelectorAll('[data-fill]').forEach((el, i) => el.replaceWith(document.createTextNode(`\u0000${i}\u0000`)))
  clone.querySelectorAll('.tip').forEach(el => el.remove())
  clone.style.cssText = 'position:fixed;left:-9999px;top:0'
  document.body.appendChild(clone)
  const text = clone.innerText.trim()
  clone.remove()
  return text.replace(/\u0000(\d+)\u0000/g, (_, i) => blanks[Number(i)]?.text() ?? '')
}

async function copy() {
  if (!done.value && !warned.value) {
    warned.value = true
    flash.value++
    clearTimeout(warnTimer)
    warnTimer = setTimeout(() => { warned.value = false }, 4000)
    return
  }
  warned.value = false
  try {
    await navigator.clipboard.writeText(promptText())
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}
</script>

<template>
  <div class="prompt">
    <div class="head">
      <span>{{ title }}</span>
      <button :class="{ ready: blanks.length && done, warn: !done, shout: warned }" @click="copy">{{ label }}</button>
    </div>
    <div v-if="warned" class="warnbar">⚠️ {{ missing }}！先把<b>閃黃光</b>的格子填好（變綠色）再複製</div>
    <div ref="body" class="body"><slot /></div>
  </div>
</template>

<style scoped>
.prompt { position: relative; border: 4px solid var(--neon); background: #0c1130; box-shadow: 6px 6px 0 #000; }
.head { display: flex; justify-content: space-between; align-items: center; gap: .5rem; background: var(--neon); color: #000; font-weight: 900; font-size: 1rem; padding: .2rem .6rem; }
button { background: #000; color: var(--neon); font-weight: 900; font-size: 1rem; padding: .1rem .7rem; cursor: pointer; white-space: nowrap; }
button.ready { background: var(--green); color: #000; border: 2px solid #000; }
button.warn { background: #3a0b22; color: var(--pink); border: 2px solid var(--pink); }
button.shout { background: var(--pink); color: #000; border-color: #000; animation: nudge .3s 2; }
.warnbar { position: absolute; left: 0; right: 0; z-index: 3; box-shadow: 0 4px 0 #000; background: var(--pink); color: #000; font-weight: 900; font-size: 1rem; padding: .15rem .6rem; border-top: 3px solid #000; }
.warnbar b { color: #000; text-decoration: underline; }
@keyframes nudge { 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
.body { padding: .4rem .8rem; font-size: 1rem; line-height: 1.5; }
.body :deep(p) { margin: .15rem 0; }
.body :deep(b) { color: var(--yellow); }
</style>
