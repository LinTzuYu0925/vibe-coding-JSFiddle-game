<script setup>
// Interactive file-URL builder: students type their own name / repo / file.
// Images use GitHub's right-click URL (blob/...?raw=true); sounds use the "View raw" link (raw/refs/heads/...).
import { ref, computed } from 'vue'

const props = defineProps({
  user: { type: String, default: 'LinTzuYu0925' },
  repo: { type: String, default: 'space_shooter' },
  file: { type: String, default: 'my-ship.gif' },
})
const user = ref(props.user)
const repo = ref(props.repo)
const branch = ref('main')
const file = ref(props.file)
const isSound = computed(() => /\.(wav|mp3|ogg)$/i.test(file.value))
const url = computed(() => isSound.value
  ? `https://github.com/${user.value}/${repo.value}/raw/refs/heads/${branch.value}/${file.value}`
  : `https://github.com/${user.value}/${repo.value}/blob/${branch.value}/${file.value}?raw=true`)
const problem = computed(() => {
  if (/\s/.test(file.value)) return '⚠️ 檔名有空格！請改成 my-ship.gif 這種寫法'
  if (/[^\x00-\x7F]/.test(file.value)) return '⚠️ 檔名有中文！請改成英文'
  if (!/\.(gif|png|jpe?g|wav|mp3|ogg)$/i.test(file.value)) return '⚠️ 記得加副檔名：.gif .png .wav .mp3'
  return ''
})
const copied = ref(false)
async function copy() {
  try { await navigator.clipboard.writeText(url.value); copied.value = true; setTimeout(() => (copied.value = false), 1200) } catch {}
}
</script>

<template>
  <div class="raw">
    <div class="kind">{{ isSound ? '🎵 聲音網址（View raw → 右鍵複製）' : '🖼️ 圖片網址（圖片上按右鍵複製）' }}</div>
    <div class="url">
      <span class="url-base">https://github.com/</span><span class="c-user">{{ user }}</span>/<span class="c-repo">{{ repo }}</span><span class="url-base">{{ isSound ? '/raw/refs/heads/' : '/blob/' }}</span><span class="c-branch">{{ branch }}</span>/<span class="c-file">{{ file }}</span><span v-if="!isSound" class="url-base">?raw=true</span>
    </div>
    <div class="fields">
      <label class="c-user">👤 使用者名稱<input v-model="user" spellcheck="false"></label>
      <label class="c-repo">📦 倉庫名稱<input v-model="repo" spellcheck="false"></label>
      <label class="c-branch">🌿 分支<input v-model="branch" spellcheck="false"></label>
      <label class="c-file">📄 檔案名稱<input v-model="file" spellcheck="false"></label>
    </div>
    <div class="foot">
      <span class="pink">{{ problem }}</span>
      <button @click="copy">{{ copied ? '✅ 已複製' : '📋 複製網址' }}</button>
    </div>
  </div>
</template>

<style scoped>
.raw { border: 4px solid var(--neon); background: #0c1130; padding: .8rem 1rem; box-shadow: 6px 6px 0 #000; }
.url { font-family: ui-monospace, Consolas, monospace; font-size: 1.05rem; word-break: break-all; background: #000; padding: .6rem .8rem; line-height: 1.5; }
.url-base { color: #aaa; }
.kind { font-weight: 900; font-size: .95rem; color: var(--yellow); margin-bottom: .4rem; }
.c-user { color: var(--neon); } .c-repo { color: var(--green); } .c-branch { color: var(--orange); } .c-file { color: var(--pink); }
.fields { display: grid; grid-template-columns: repeat(4, 1fr); gap: .6rem; margin-top: .7rem; }
label { display: flex; flex-direction: column; font-size: .9rem; font-weight: 900; gap: .2rem; }
input { font-family: ui-monospace, Consolas, monospace; font-size: .9rem; background: #000; color: inherit; border: 2px solid currentColor; padding: .25rem .4rem; }
.foot { display: flex; justify-content: space-between; align-items: center; margin-top: .6rem; min-height: 2rem; font-size: 1rem; }
button { background: var(--yellow); color: #000; font-weight: 900; padding: .3rem .8rem; box-shadow: 3px 3px 0 #000; cursor: pointer; font-size: .95rem; }
</style>
