<script setup>
import { ref } from 'vue'
const score = ref(0)
</script>

<template>
  <div class="center">
    <div class="box"><small>score</small><b>📦 {{ score }}</b></div>
    <div style="margin-top:1rem">
      <button class="card yellow" style="cursor:pointer;color:#fff;font-size:1.3rem" @click="score++">
        🔫 打中敵人！
      </button>
      <button class="card" style="cursor:pointer;color:#fff;font-size:1rem;margin-left:.6rem" @click="score = 0">重來</button>
    </div>
  </div>
</template>
