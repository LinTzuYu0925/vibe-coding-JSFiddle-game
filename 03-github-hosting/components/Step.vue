<script setup>
// Quest badge shown at the top-right of each hands-on slide
defineProps({
  n: { type: [String, Number], required: true },
  quest: { type: String, default: '' },
  label: { type: String, default: 'STEP' },
})
</script>

<template>
  <div class="step-badge">
    <span class="lv">{{ label }} {{ n }}</span>
    <span v-if="quest" class="qn">{{ quest }}</span>
  </div>
</template>

<style scoped>
.step-badge { position: absolute; top: 1.3rem; right: 2rem; display: flex; gap: .4rem; z-index: 5; }
.lv, .qn { font-family: 'Press Start 2P', monospace; font-size: .65rem; padding: .35rem .55rem; box-shadow: 3px 3px 0 #000; }
.lv { background: var(--pink); color: #000; }
.qn { background: #0c1130; color: var(--yellow); border: 2px solid var(--yellow); font-family: 'Noto Sans TC', sans-serif; font-size: .85rem; font-weight: 900; padding: .15rem .5rem; }
</style>
