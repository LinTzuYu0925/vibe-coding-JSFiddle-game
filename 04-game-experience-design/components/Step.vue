<script setup>
// Header badge on every hands-on slide: which STEP (0-3), which kind of slide, and who acts.
//   n:     0..3
//   kind:  目標 | 步驟 | Prompt | 檢查 ...  (free text)
//   actor: teacher | all | me
defineProps({
  n: { type: [String, Number], required: true },
  kind: { type: String, default: '' },
  actor: { type: String, default: 'all' },
})
const actors = {
  teacher: '👩‍🏫 老師示範',
  all: '👥 全班一起',
  me: '🧑 你自己做',
}
</script>

<template>
  <div class="step-badge">
    <span class="dots" aria-hidden="true">
      <i v-for="i in 3" :key="i" :class="{ on: i <= Number(n) }"></i>
    </span>
    <span class="lv">STEP {{ n }}</span>
    <span v-if="kind" class="qn">{{ kind }}</span>
    <span class="who" :class="actor">{{ actors[actor] }}</span>
  </div>
</template>

<style scoped>
.step-badge { position: absolute; top: .45rem; right: 1.6rem; display: flex; gap: .4rem; align-items: center; z-index: 5; }
.dots { display: flex; gap: .2rem; margin-right: .1rem; }
.dots i { width: .7rem; height: .7rem; border-radius: 50%; border: 2px solid var(--ink); background: #fff; }
.dots i.on { background: var(--grass); }
.lv { font-family: 'Press Start 2P', monospace; font-size: .55rem; padding: .3rem .5rem; border-radius: 4px; background: var(--orange); color: #fff; }
.qn { background: #fff; color: var(--ink); border: 2px solid var(--ink); font-size: .8rem; font-weight: 900; padding: .15rem .5rem; border-radius: 4px; }
.who { font-size: .8rem; font-weight: 900; padding: .15rem .55rem; border-radius: 999px; color: #fff; }
.who.teacher { background: var(--c-start); }
.who.all { background: var(--grass-dark); }
.who.me { background: var(--c-lose); }
</style>
