<script setup>
// Shows where a snippet lives in the game's source file
defineProps({ l: { type: String, required: true } })
</script>

<template>
  <span class="loc">📄 Untitled-1.js · 第 {{ l }} 行</span>
</template>
