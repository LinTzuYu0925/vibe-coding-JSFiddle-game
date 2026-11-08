<script setup>
// Simplified mock of submitting a link in Google Classroom (needs a school login, so it can't be screenshotted)
// step 1 = 新增或建立 menu, 2 = 新增連結 dialog, 3 = link attached → 繳交
defineProps({
  step: { type: Number, default: 1 },
  title: { type: String, default: '打造你的專屬戰機!' },
  link: { type: String, default: 'k3x9ab2q/3' },
})
</script>

<template>
  <div class="gc">
    <div class="badge">示意圖 · Google Classroom</div>
    <div class="layout">
      <div class="task">
        <div class="icon">📋</div>
        <div>
          <div class="title">{{ title }}</div>
          <div class="meta">老師 · 100 分</div>
        </div>
      </div>
      <div class="work">
        <div class="work-head"><b>你的作業</b><span class="assigned">已指派</span></div>
        <template v-if="step < 3">
          <div class="add" :class="{ hot: step === 1 }">＋ 新增或建立</div>
          <div v-if="step === 1" class="menu">
            <div>🟢 Google 雲端硬碟</div>
            <div class="hot">🔗 連結</div>
            <div>📎 檔案</div>
          </div>
        </template>
        <template v-else>
          <div class="link">🔗 <span>jsfiddle.net/{{ link }}</span></div>
          <div class="add">＋ 新增或建立</div>
        </template>
        <div class="submit" :class="{ hot: step === 3, off: step < 3 }">繳交</div>
      </div>
    </div>
    <div v-if="step === 2" class="dialog">
      <div class="d-title">新增連結</div>
      <div class="d-input hot">https://jsfiddle.net/{{ link }}</div>
      <div class="d-btns"><span>取消</span><span class="d-ok">新增連結</span></div>
    </div>
  </div>
</template>

<style scoped>
.gc { position: relative; background: #fff; color: #1f1f1f; font-family: 'Google Sans', Roboto, 'Noto Sans TC', sans-serif; font-size: .85rem; border: 4px solid #fff; box-shadow: 8px 8px 0 #000; padding: 1rem; line-height: 1.4; }
.badge { position: absolute; top: -.9rem; right: .6rem; background: var(--yellow); color: #000; font-weight: 900; font-size: .8rem; padding: .15rem .5rem; box-shadow: 3px 3px 0 #000; z-index: 2; }
.layout { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; align-items: start; }
.task { display: flex; gap: .5rem; align-items: center; }
.icon { width: 2rem; height: 2rem; border-radius: 50%; background: #1e8e3e; display: grid; place-items: center; }
.title { font-size: 1.05rem; color: #137333; font-weight: 600; }
.meta { color: #5f6368; font-size: .75rem; }
.work { border: 1px solid #dadce0; border-radius: 8px; padding: .6rem; box-shadow: 0 1px 3px #0002; }
.work-head { display: flex; justify-content: space-between; margin-bottom: .5rem; }
.assigned { color: #137333; font-size: .75rem; }
.add { border: 1px solid #dadce0; border-radius: 6px; text-align: center; padding: .25rem; color: #1967d2; font-weight: 600; }
.menu { border: 1px solid #dadce0; border-radius: 6px; margin-top: .3rem; box-shadow: 0 4px 12px #0003; }
.menu div { padding: .25rem .6rem; }
.link { border: 1px solid #dadce0; border-radius: 6px; padding: .3rem .4rem; margin-bottom: .4rem; font-family: ui-monospace, Consolas, monospace; font-size: .68rem; white-space: nowrap; }
.submit { margin-top: .5rem; background: #1967d2; color: #fff; border-radius: 6px; text-align: center; padding: .3rem; font-weight: 600; }
.submit.off { opacity: .45; }
.dialog { position: absolute; left: 12%; right: 12%; top: 30%; background: #fff; border-radius: 8px; box-shadow: 0 8px 28px #0006; padding: .8rem; }
.d-title { font-size: 1rem; font-weight: 600; margin-bottom: .5rem; }
.d-input { border-bottom: 2px solid #1967d2; padding: .2rem; font-family: ui-monospace, Consolas, monospace; font-size: .8rem; }
.d-btns { display: flex; justify-content: flex-end; gap: 1rem; margin-top: .6rem; color: #1967d2; font-weight: 600; }
.d-ok { background: #1967d2; color: #fff; border-radius: 4px; padding: .1rem .6rem; }
.hot { outline: 4px solid var(--pink); outline-offset: 2px; }
</style>
