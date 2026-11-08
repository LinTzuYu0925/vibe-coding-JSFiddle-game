<script setup>
// A tiny CSS pixel-art spaceship, used as the "your GIF goes here" stand-in
defineProps({ size: { type: Number, default: 8 }, color: { type: String, default: '#5ef2ff' } })
const art = [
  '....#....',
  '...###...',
  '...#o#...',
  '..#####..',
  '.##+#+##.',
  '#########',
  '#.#...#.#',
  '..f...f..',
]
</script>

<template>
  <div class="ship float" :style="{ '--px': size + 'px', '--c': color }">
    <div v-for="(line, y) in art" :key="y" class="line">
      <i v-for="(ch, x) in line" :key="x" :class="{ 'px-h': ch === '#', 'px-o': ch === 'o', 'px-p': ch === '+', 'px-f': ch === 'f' }" />
    </div>
  </div>
</template>

<style scoped>
.ship { display: inline-block; line-height: 0; }
.line { display: flex; }
i { width: var(--px); height: var(--px); display: block; }
i.px-h { background: var(--c); }
i.px-o { background: #fff; }
i.px-p { background: var(--pink); }
i.px-f { background: var(--orange); animation: flame .2s steps(2) infinite; }
@keyframes flame { 50% { background: var(--yellow); } }
</style>
