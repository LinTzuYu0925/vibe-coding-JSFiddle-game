<template>
  <!-- a blank inside a prompt that students replace with their own text -->
  <span class="ph">【<slot />】</span>
</template>

<style scoped>
.ph { color: #000; background: var(--pink); font-weight: 900; padding: 0 .2rem; }
</style>
