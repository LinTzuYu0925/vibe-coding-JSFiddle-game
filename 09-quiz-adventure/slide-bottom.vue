<script setup>
// Page number at the bottom-right of every slide, so the teacher can say 「翻到第 12 頁」.
// The number counts only the slides students see: hostOnly slides (teacher version only) are skipped, so the
// teacher version and the student site show the same number on the same page. A hostOnly slide shows 「老師頁」.
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const { slides } = useNav()
const { $page } = useSlideContext()
const hidden = r => r?.meta?.slide?.frontmatter?.hostOnly === true
const info = computed(() => {
  const list = slides.value
  const me = list[$page.value - 1]
  if (hidden(me)) return { teacher: true }
  const n = list.slice(0, $page.value).filter(r => !hidden(r)).length
  return { n, total: list.filter(r => !hidden(r)).length }
})
</script>

<template>
  <div v-if="$page > 1" class="page-no" :class="{ teacher: info.teacher }">
    <template v-if="info.teacher">🔒 老師頁</template>
    <template v-else>第 <b>{{ info.n }}</b> 頁</template>
  </div>
</template>

<style scoped>
.page-no {
  position: absolute; right: .9rem; bottom: .55rem; z-index: 20; pointer-events: none;
  font-family: 'Noto Sans TC', sans-serif; font-size: .95rem; font-weight: 900; color: #000;
  background: var(--yellow); padding: .05rem .55rem; box-shadow: 3px 3px 0 #000;
}
.page-no b { font-size: 1.15rem; }
.page-no.teacher { background: var(--neon); }
</style>
