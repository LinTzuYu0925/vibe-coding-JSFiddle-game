<script setup>
// Simplified mock of GitHub's upload flow (the real page needs a login, so it can't be screenshotted)
defineProps({ step: { type: Number, default: 1 } })
</script>

<template>
  <div class="gh">
    <div class="badge">示意圖 · 實際畫面需登入 GitHub</div>
    <div class="bar">
      <span class="crumb">LinTzuYu0925 / <b>space_shooter</b></span>
      <span class="btns">
        <span class="btn" :class="{ hot: step <= 1 }">Add file ▾</span>
        <span class="btn green">&lt;&gt; Code ▾</span>
      </span>
    </div>
    <div v-if="step === 0" class="files">
      <div class="commit-row">👤 LinTzuYu0925 &nbsp;Initial commit</div>
      <div>📄 README.md</div>
    </div>
    <div v-if="step === 1" class="menu">
      <div>＋ Create new file</div>
      <div class="hot">⤒ Upload files</div>
    </div>
    <div v-if="step >= 2" class="drop" :class="{ hot: step === 2 }">
      <div class="big-icon">📂</div>
      <div><b>Drag files here</b> to add them to your repository</div>
      <div class="small">Or <u>choose your files</u></div>
      <div v-if="step >= 3" class="file">🖼️ my-ship.gif <span class="ok">✓</span></div>
    </div>
    <div v-if="step >= 3" class="commit">
      <div class="small">Commit changes</div>
      <div class="input">Add files via upload</div>
      <span class="btn green" :class="{ hot: step === 3 }">Commit changes</span>
    </div>
  </div>
</template>

<style scoped>
.gh { position: relative; background: #fff; color: #1f2328; font-family: -apple-system, 'Segoe UI', 'Noto Sans TC', sans-serif; font-size: .95rem; border: 4px solid #fff; box-shadow: 8px 8px 0 #000; padding: .8rem 1rem 1rem; line-height: 1.4; }
.badge { position: absolute; top: -.9rem; right: .6rem; background: var(--yellow); color: #000; font-weight: 900; font-size: .8rem; padding: .15rem .5rem; box-shadow: 3px 3px 0 #000; }
.crumb { font-size: .85rem; }
.bar { gap: .5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #d0d7de; padding-bottom: .5rem; }
.btns { display: flex; gap: .4rem; }
.btn { white-space: nowrap; border: 1px solid #d0d7de; background: #f6f8fa; border-radius: 6px; padding: .15rem .6rem; font-weight: 600; font-size: .85rem; display: inline-block; }
.btn.green { background: #1f883d; color: #fff; border-color: #1f883d; }
.files { margin-top: .7rem; border: 1px solid #d0d7de; border-radius: 6px; }
.files div { padding: .3rem .7rem; }
.files .commit-row { background: #f6f8fa; border-bottom: 1px solid #d0d7de; color: #59636e; font-size: .85rem; }
.menu { margin: .4rem 0 0 auto; width: 12rem; border: 1px solid #d0d7de; border-radius: 6px; box-shadow: 0 6px 16px #0003; }
.menu div { padding: .35rem .7rem; }
.drop { margin-top: .7rem; border: 2px dashed #d0d7de; border-radius: 6px; text-align: center; padding: .7rem; }
.big-icon { font-size: 2rem; line-height: 1.2; }
.file { margin-top: .4rem; font-family: ui-monospace, Consolas, monospace; }
.ok { color: #1f883d; font-weight: 900; }
.commit { margin-top: .7rem; display: flex; flex-direction: column; gap: .3rem; align-items: flex-start; }
.input { border: 1px solid #d0d7de; border-radius: 6px; padding: .2rem .5rem; width: 100%; color: #59636e; }
.small { font-size: .8rem; color: #59636e; }
.hot { outline: 4px solid var(--pink); outline-offset: 2px; animation: blink 1.2s ease-in-out infinite; }
@keyframes blink { 50% { outline-color: #ff5ea844; } }
</style>
