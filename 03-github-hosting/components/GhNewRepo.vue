<script setup>
// Simplified mock of the "Configuration" part of github.com/new (needs a login, so it can't be screenshotted)
</script>

<template>
  <div class="gh">
    <div class="badge">示意圖 · 實際畫面需登入 GitHub</div>
    <div class="sec"><span class="num">2</span> Configuration</div>
    <div class="row">
      <div><b>Choose visibility *</b><div class="hint">Choose who can see and commit to this repository</div></div>
      <div class="ctl hot n1">🌐 Public ▾</div>
    </div>
    <div class="row">
      <div><b>Add README</b><div class="hint">READMEs can be used as longer descriptions.</div></div>
      <div class="ctl hot n2"><span class="toggle"><i /></span> On</div>
    </div>
    <div class="row dim">
      <div><b>Add .gitignore</b></div>
      <div class="ctl">No .gitignore ▾</div>
    </div>
    <div class="row dim">
      <div><b>Add license</b></div>
      <div class="ctl">No license ▾</div>
    </div>
    <div class="end"><span class="btn hot n3">Create repository</span></div>
  </div>
</template>

<style scoped>
.gh { position: relative; background: #fff; color: #1f2328; font-family: -apple-system, 'Segoe UI', 'Noto Sans TC', sans-serif; font-size: .9rem; border: 4px solid #fff; box-shadow: 8px 8px 0 #000; padding: 1rem 1.2rem; line-height: 1.35; }
.badge { position: absolute; top: -.9rem; right: .6rem; background: var(--yellow); color: #000; font-weight: 900; font-size: .8rem; padding: .15rem .5rem; box-shadow: 3px 3px 0 #000; }
.sec { font-size: 1.1rem; font-weight: 600; margin-bottom: .4rem; display: flex; align-items: center; gap: .5rem; }
.num { width: 1.6rem; height: 1.6rem; border-radius: 50%; background: #f6f8fa; display: grid; place-items: center; font-size: .85rem; color: #59636e; }
.row { display: flex; justify-content: space-between; align-items: center; border: 1px solid #d0d7de; border-bottom: none; padding: .5rem .8rem; gap: 1rem; }
.row:last-of-type { border-bottom: 1px solid #d0d7de; }
.row.dim { color: #59636e; }
.hint { font-size: .72rem; color: #59636e; }
.ctl { border: 1px solid #d0d7de; border-radius: 6px; padding: .15rem .6rem; background: #f6f8fa; font-weight: 600; white-space: nowrap; display: flex; align-items: center; gap: .4rem; }
.toggle { width: 2.1rem; height: 1.1rem; border-radius: 1rem; background: #1f883d; position: relative; display: inline-block; }
.toggle i { position: absolute; right: 2px; top: 2px; width: .85rem; height: .85rem; border-radius: 50%; background: #fff; }
.end { display: flex; justify-content: flex-end; margin-top: .8rem; }
.btn { background: #1f883d; color: #fff; border-radius: 6px; padding: .3rem .9rem; font-weight: 600; }
.hot { outline: 4px solid var(--pink); outline-offset: 3px; position: relative; }
.hot::after { position: absolute; left: -2.3rem; top: 50%; transform: translateY(-50%); width: 1.6rem; height: 1.6rem; line-height: 1.6rem; text-align: center; background: var(--pink); color: #000; font-family: 'Press Start 2P', monospace; font-size: .7rem; box-shadow: 2px 2px 0 #000; }
.n1::after { content: '1'; } .n2::after { content: '2'; } .n3::after { content: '3'; }
</style>
