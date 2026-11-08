<script setup>
// Original flowchart of the game states. menu -> playing -> victory | gameover -> restart.
// codeNames: show the English state names used in code under each box.
defineProps({ codeNames: { type: Boolean, default: true } })
</script>

<template>
  <svg viewBox="0 0 860 330" class="flow" role="img" aria-label="遊戲狀態流程圖">
    <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="#14213d" />
      </marker>
    </defs>

    <!-- boxes -->
    <g font-weight="900" text-anchor="middle">
      <rect x="20" y="115" width="170" height="90" rx="12" fill="#eaf0fe" stroke="#2563eb" stroke-width="4" />
      <text style="font-size:26px" x="105" y="152"  fill="#2563eb">🏁 開始畫面</text>
      <text style="font-size:17px" v-if="codeNames" x="105" y="184"  fill="#14213d" font-family="monospace">"menu"</text>

      <rect x="300" y="115" width="190" height="90" rx="12" fill="#e6f5ea" stroke="#2e9e4f" stroke-width="4" />
      <text style="font-size:26px" x="395" y="152"  fill="#1f7a39">⚽ 遊戲中</text>
      <text style="font-size:17px" v-if="codeNames" x="395" y="184"  fill="#14213d" font-family="monospace">"playing"</text>

      <rect x="640" y="20" width="200" height="90" rx="12" fill="#fff1df" stroke="#f08a24" stroke-width="4" />
      <text style="font-size:26px" x="740" y="57"  fill="#d9730d">🏆 勝利</text>
      <text style="font-size:17px" v-if="codeNames" x="740" y="89"  fill="#14213d" font-family="monospace">"victory"</text>

      <rect x="640" y="205" width="200" height="90" rx="12" fill="#fdeeee" stroke="#d64545" stroke-width="4" />
      <text style="font-size:26px" x="740" y="242"  fill="#d64545">💥 Game Over</text>
      <text style="font-size:17px" v-if="codeNames" x="740" y="274"  fill="#14213d" font-family="monospace">"gameover"</text>
    </g>

    <!-- arrows -->
    <g stroke="#14213d" stroke-width="4" fill="none" marker-end="url(#ah)">
      <path d="M190 160 H 296" />
      <path d="M490 140 L 636 82" />
      <path d="M490 180 L 636 238" />
      <!-- restart loops: both end screens go back to playing -->
      <path d="M640 52 C 560 22, 450 36, 415 110" stroke-dasharray="9 7" />
      <path d="M640 268 C 560 298, 450 284, 415 210" stroke-dasharray="9 7" />
    </g>

    <g style="font-size:17px;font-weight:900;paint-order:stroke;stroke:#fff;stroke-width:6px;stroke-linejoin:round" fill="#14213d" text-anchor="middle">
      <text x="243" y="146">按下開始</text>
      <text x="560" y="134" transform="rotate(-22 560 134)">進球數 ≥ 目標</text>
      <text x="560" y="196" transform="rotate(22 560 196)">時間到，沒達標</text>
      <text x="520" y="22" fill="#4a5875">重新開始（全部歸零）</text>
      <text x="520" y="322" fill="#4a5875">重新開始（全部歸零）</text>
    </g>
  </svg>
</template>

<style scoped>
.flow { width: 100%; }
</style>

