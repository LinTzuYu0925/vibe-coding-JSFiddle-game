<script setup>
// Illustrative MOCKUPS of the four screens (drawn with HTML/CSS, NOT real screenshots of a finished game).
// kind: now (today's game before any change) | start | play | win | over | mine (Step 3 example)
// label: small coloured chip above the mockup, e.g. "現在" or "完成 Step 1"
defineProps({
  kind: { type: String, default: 'start' },
  target: { type: [String, Number], default: 5 },
  numbered: { type: Boolean, default: false }, // show ①②③④ badges on the start screen
  big: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  label: { type: String, default: '' },
})
const meta = {
  now: { tag: 'NOW', cls: 'now' },
  mine: { tag: 'MINE', cls: 'mine' },
  start: { tag: 'START', cls: 'start' },
  play: { tag: 'PLAY', cls: 'play' },
  win: { tag: 'VICTORY', cls: 'win' },
  over: { tag: 'GAME OVER', cls: 'lose' },
}
</script>

<template>
  <div class="mock" :class="[meta[kind].cls, { big, small }]">
    <div v-if="label" class="chip">{{ label }}</div>
    <div class="bar" v-if="kind === 'now'"><span>⚽ SUPER STRIKER</span><span>GOALS 0</span><span>TIME 60</span></div>
    <div class="bar" v-else><span>{{ kind === 'mine' ? '🌊 海灘足球盃' : '⚽ 足球大師' }}</span><span>進球 {{ kind === 'win' ? target : kind === 'over' ? 3 : kind === 'start' ? 0 : kind === 'mine' ? 1 : 2 }}/{{ kind === 'mine' ? 3 : target }}</span><span>⏱ {{ kind === 'over' ? 0 : kind === 'win' ? 23 : kind === 'start' ? 60 : kind === 'mine' ? 48 : 41 }}</span></div>
    <div class="pitch">
      <div class="goal"></div>
      <div class="keeper"></div>
      <div class="p"></div>
      <div v-if="kind === 'play' || kind === 'mine' || kind === 'now'" class="d d1"></div>
      <div v-if="kind === 'play' || kind === 'mine' || kind === 'now'" class="d d2"></div>
      <div v-if="kind === 'now'" class="getready">GET READY!</div>
      <div v-if="kind === 'now'" class="tinybtn">▶ START GAME</div>
      <div v-if="kind !== 'play' && kind !== 'now' && kind !== 'mine'" class="overlay">
        <template v-if="kind === 'start'">
          <b class="t"><i v-if="numbered" class="n">1</i>足球大師</b>
          <span><i v-if="numbered" class="n">2</i>60 秒內射進 {{ target }} 球！</span>
          <span class="keys"><i v-if="numbered" class="n">3</i>方向鍵 / WASD 移動 · 空白鍵 射門</span>
          <span class="btn"><i v-if="numbered" class="n">4</i>▶ 開始遊戲</span>
        </template>
        <template v-else-if="kind === 'win'">
          <b class="t">🏆 你贏了！</b>
          <span>最後得分：{{ target }} 球</span>
          <span class="btn">↻ 再玩一次</span>
        </template>
        <template v-else>
          <b class="t">GAME OVER</b>
          <span>時間到！最後得分：3 球</span>
          <span class="btn">↻ 再試一次</span>
        </template>
      </div>
    </div>
    <div class="cap">示意圖</div>
  </div>
</template>

<style scoped>
.mock { position: relative; border: 3px solid var(--ink); border-radius: 8px; overflow: hidden; box-shadow: 5px 5px 0 var(--ink); background: #fff; font-size: .8rem; line-height: 1.3; }
.bar { display: flex; justify-content: space-around; background: var(--ink); color: #fff; font-weight: 900; padding: .25rem; font-size: .8rem; }
.pitch { position: relative; height: 10.2rem; background: repeating-linear-gradient(#4fb35c 0 1.7rem, #3fa04d 1.7rem 3.4rem); overflow: hidden; }
.goal { position: absolute; top: 0; left: 38%; width: 24%; height: 1.5rem; border: 3px solid #fff; border-top: 0; background: #ffffff55; }
.keeper { position: absolute; top: 1.5rem; left: 47%; width: .9rem; height: 1.3rem; background: #f3c53b; border: 2px solid var(--ink); border-radius: 3px; }
.p { position: absolute; bottom: .6rem; left: 47%; width: 1rem; height: 1.5rem; background: #2477e8; border: 2px solid var(--ink); border-radius: 3px; }
.d { position: absolute; width: .9rem; height: 1.3rem; background: #e34a43; border: 2px solid var(--ink); border-radius: 3px; }
.d1 { top: 4rem; left: 25%; } .d2 { top: 3rem; left: 66%; }
.overlay { position: absolute; inset: 0; background: #14213dcc; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .3rem; text-align: center; padding: 0 .5rem; }
.t { font-size: 1.5rem; font-weight: 900; }
.start .t { color: #9dbdff; } .win .t { color: #ffc680; } .lose .t { color: #ff9b9b; }
.keys { background: #ffffff22; padding: .05rem .5rem; border-radius: 4px; }
.btn { background: #ffd54a; color: var(--ink); font-weight: 900; padding: .15rem .9rem; border-radius: 999px; box-shadow: 0 3px 0 #b8860b; margin-top: .15rem; }
.big .pitch { height: 15rem; } .big .bar { font-size: 1.05rem; } .big { font-size: 1.05rem; } .big .t { font-size: 2.3rem; }
.n { display: inline-block; width: 1.4em; height: 1.4em; line-height: 1.4em; text-align: center; border-radius: 50%; background: var(--c-start); color: #fff; font-style: normal; font-weight: 900; font-size: .8em; margin-right: .4em; border: 2px solid #fff; vertical-align: middle; }
.cap { position: absolute; right: .4rem; bottom: .25rem; font-size: .65rem; font-weight: 900; color: #fff; background: #14213d99; padding: 0 .4rem; border-radius: 3px; }
.chip { position: absolute; top: 1.9rem; left: .4rem; z-index: 2; background: var(--ink); color: #fff; font-weight: 900; padding: 0 .5rem; border-radius: 4px; font-size: .8em; }
.now .bar { background: #4a5875; } .now .pitch { filter: saturate(.7); }
.getready { position: absolute; top: 42%; width: 100%; text-align: center; font-weight: 900; font-size: 1.5rem; color: #fff36b; text-shadow: 2px 2px 0 var(--ink); }
.tinybtn { position: absolute; bottom: .2rem; left: 50%; transform: translateX(-50%); background: #ffd54a; color: var(--ink); font-weight: 900; font-size: .7em; padding: 0 .7rem; border-radius: 999px; }
.mine .pitch { background: repeating-linear-gradient(#f2dc9b 0 1.7rem, #ead08a 1.7rem 3.4rem); }
.mine .bar { background: #0b6e8a; }
.small { font-size: .62rem; border-width: 2px; box-shadow: 3px 3px 0 var(--ink); }
.small .bar { font-size: .62rem; padding: .15rem; } .small .pitch { height: 6.6rem; } .small .t { font-size: 1.05rem; }
.small .bar { gap: .5rem; justify-content: space-between; padding: .15rem .4rem; } .small .bar span { white-space: nowrap; } .small .overlay { padding-bottom: 1rem; gap: .15rem; } .small .overlay span { font-size: .9em; } .small .keys { padding: 0 .3rem; }
.small .getready { font-size: 1rem; } .small .btn { padding: .05rem .6rem; }
</style>
