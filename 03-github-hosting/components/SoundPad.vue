<script setup>
// Lets the teacher preview each sound in class.
// game over = the real example WAV (bundled in public/audio).
// bgm / kick = browser-synthesized stand-ins, because students upload their own files.
import { ref, onBeforeUnmount } from 'vue'

const props = defineProps({ only: { type: String, default: '' } })
const show = k => !props.only || props.only.split(',').includes(k)

let ctx
const audioCtx = () => (ctx ??= new AudioContext())

function kick() {
  const c = audioCtx(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime
  o.type = 'sine'
  o.frequency.setValueAtTime(160, t)
  o.frequency.exponentialRampToValueAtTime(45, t + 0.15)
  g.gain.setValueAtTime(0.6, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
  o.connect(g).connect(c.destination)
  o.start(t); o.stop(t + 0.2)
}

const bgmOn = ref(false)
let timer
const notes = [262, 330, 392, 523, 392, 330]
function toggleBgm() {
  bgmOn.value = !bgmOn.value
  if (!bgmOn.value) return clearInterval(timer)
  let i = 0
  timer = setInterval(() => {
    const c = audioCtx(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime
    o.type = 'triangle'
    o.frequency.value = notes[i++ % notes.length]
    g.gain.setValueAtTime(0.08, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22)
    o.connect(g).connect(c.destination)
    o.start(t); o.stop(t + 0.24)
  }, 240)
}

const over = new Audio(`${import.meta.env.BASE_URL}audio/mixkit-arcade-retro-game-over-213.wav`)
function gameOver() { over.currentTime = 0; over.play() }

onBeforeUnmount(() => { clearInterval(timer); over.pause() })
</script>

<template>
  <div class="pad">
    <button v-if="show('bgm')" class="neon" @click="toggleBgm">
      🎵 BGM <b>{{ bgmOn ? '⏸ 停止' : '▶ 播放' }}</b><small>示範音樂（瀏覽器合成）</small>
    </button>
    <button v-if="show('kick')" class="yellow" @click="kick">
      ⚽ kick <b>▶ 踢球</b><small>示範音效（瀏覽器合成）</small>
    </button>
    <button v-if="show('over')" class="pink" @click="gameOver">
      ⏰ 時間到 <b>▶ 播放</b><small>mixkit-arcade-retro-game-over-213.wav</small>
    </button>
  </div>
</template>

<style scoped>
.pad { display: flex; gap: .8rem; flex-wrap: wrap; }
button { flex: 1; min-width: 10rem; background: #0c1130; color: #fff; border: 4px solid; padding: .5rem .7rem; box-shadow: 5px 5px 0 #000; cursor: pointer; font-size: 1.05rem; text-align: left; display: flex; flex-direction: column; gap: .15rem; }
button:active { transform: translate(3px, 3px); box-shadow: 2px 2px 0 #000; }
button.neon { border-color: var(--neon); } button.yellow { border-color: var(--yellow); } button.pink { border-color: var(--pink); }
small { font-size: .7rem; opacity: .7; word-break: break-all; }
</style>
