<script setup>
// Badge at the top-right of every hands-on slide (merge of deck 03 and deck 04, dark-neon colours).
//   label: STEP (default) | SETUP | HOMEWORK | any short word (找找看, 我的版本 …)
//   n:     number after the label (optional); with label STEP and n 1–3 the three progress dots light up
//   kind:  目標 | 步驟 | Prompt | 檢查 … (optional)
//   actor: teacher | all | me | pair   → 老師示範 / 全班一起 / 你自己做 / 兩人一組
//   quest: extra chip (optional)
const props = defineProps({
  n: { type: [String, Number], default: '' },
  label: { type: String, default: 'STEP' },
  kind: { type: String, default: '' },
  actor: { type: String, default: '' },
  quest: { type: String, default: '' },
})
const actors = {
  teacher: '👩‍🏫 老師示範',
  all: '👥 全班一起',
  me: '🧑 你自己做',
  pair: '👫 兩人一組',
}
const dots = props.label === 'STEP' && /^[1-3]$/.test(String(props.n))
</script>

<template>
  <div class="step-badge">
    <span v-if="dots" class="dots" aria-hidden="true">
      <i v-for="i in 3" :key="i" :class="{ on: i <= Number(n) }"></i>
    </span>
    <span class="lv">{{ label }}<template v-if="n !== ''"> {{ n }}</template></span>
    <span v-if="kind" class="qn">{{ kind }}</span>
    <span v-if="quest" class="qn">{{ quest }}</span>
    <span v-if="actor" class="who" :class="actor">{{ actors[actor] }}</span>
  </div>
</template>

<style scoped>
.step-badge { position: absolute; top: 1.2rem; right: 1.8rem; display: flex; gap: .4rem; align-items: center; z-index: 5; }
.dots { display: flex; gap: .22rem; margin-right: .1rem; }
.dots i { width: .7rem; height: .7rem; border: 2px solid var(--green); background: transparent; }
.dots i.on { background: var(--green); }
.lv { font-family: 'Press Start 2P', 'Noto Sans TC', monospace; font-size: .65rem; padding: .35rem .55rem; background: var(--pink); color: #000; box-shadow: 3px 3px 0 #000; }
.qn { background: #0c1130; color: var(--neon); border: 2px solid var(--neon); font-size: .85rem; font-weight: 900; padding: .1rem .5rem; }
.who { font-size: .85rem; font-weight: 900; padding: .12rem .55rem; color: #000; box-shadow: 3px 3px 0 #000; }
.who.teacher { background: var(--neon); }
.who.all { background: var(--green); }
.who.me { background: var(--yellow); }
.who.pair { background: var(--yellow); }
</style>
