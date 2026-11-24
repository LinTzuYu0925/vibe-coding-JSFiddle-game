<script setup>
// Draggable word chips (shown in random order): drag a chip onto a dropdown blank (<Ph pick=...>) to fill it.
//   <Drag words="牆|地板|玩家起點" />
import { computed } from 'vue'
const props = defineProps({ words: { type: String, required: true } })
// shuffled once when the page opens, so the cards are not in the same order as the blanks
const list = computed(() => {
  const w = props.words.split('|').map(s => s.trim()).filter(Boolean)
  for (let i = w.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [w[i], w[j]] = [w[j], w[i]] }
  return w
})
function start(e, w) {
  e.dataTransfer.setData('text/plain', w)
  e.dataTransfer.effectAllowed = 'copy'
}
</script>

<template>
  <div class="drag">
    <span v-for="w in list" :key="w" draggable="true" @dragstart="start($event, w)">{{ w }}</span>
  </div>
</template>

<style scoped>
.drag { display: flex; flex-wrap: wrap; gap: .4rem; margin: .3rem 0 .2rem; }
span {
  font-size: 1.05rem; font-weight: 900; line-height: 1.5; cursor: grab; user-select: none;
  border: 2px solid var(--yellow); color: #000; background: var(--yellow); padding: 0 .6rem;
  box-shadow: 3px 3px 0 #000;
}
span:active { cursor: grabbing; }
</style>
