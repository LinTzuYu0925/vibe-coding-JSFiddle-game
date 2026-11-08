<script setup>
// ORIGINAL illustration of a generic side-scrolling platformer level (not a screenshot, no Nintendo artwork).
// It is only used to point at the five things every level of such games has.
const blocks = [200, 232, 264] // floating brick row
</script>

<template>
  <svg viewBox="0 0 820 330" class="lvl" role="img" aria-label="原創示意圖：橫向捲軸遊戲關卡">
    <rect width="820" height="330" fill="#e8f3ff" />
    <!-- clouds + hills -->
    <g fill="#fff"><ellipse cx="130" cy="50" rx="46" ry="16" /><ellipse cx="560" cy="40" rx="56" ry="18" /></g>
    <path d="M0 250 Q 110 160 220 250 Z" fill="#cdebd3" />
    <path d="M470 250 Q 560 190 650 250 Z" fill="#cdebd3" />

    <!-- ground (with a pit) -->
    <g>
      <rect x="0" y="250" width="330" height="80" fill="#c98a4b" /><rect x="0" y="250" width="330" height="14" fill="#2e9e4f" />
      <rect x="430" y="250" width="390" height="80" fill="#c98a4b" /><rect x="430" y="250" width="390" height="14" fill="#2e9e4f" />
      <g stroke="#a8702f" stroke-width="3" fill="none">
        <path v-for="x in [60,120,180,240,300,490,550,610,670,730,790]" :key="x" :d="`M${x} 264 V330`" />
      </g>
    </g>

    <!-- floating blocks -->
    <g>
      <rect v-for="x in blocks" :key="x" :x="x" y="160" width="32" height="32" fill="#e0a560" stroke="#14213d" stroke-width="3" />
      <rect x="232" y="160" width="32" height="32" fill="#ffd54a" stroke="#14213d" stroke-width="3" />
      <text style="font-size:22px;font-weight:900" x="248" y="184" text-anchor="middle"   fill="#14213d">?</text>
    </g>

    <!-- hero: simple pixel figure (original) -->
    <g transform="translate(42 202)">
      <rect x="6" y="0" width="24" height="12" fill="#14213d" />
      <rect x="8" y="12" width="20" height="14" fill="#f2c9a0" />
      <rect x="4" y="26" width="28" height="14" fill="#2563eb" />
      <rect x="4" y="40" width="10" height="8" fill="#14213d" /><rect x="22" y="40" width="10" height="8" fill="#14213d" />
    </g>

    <!-- enemy: generic blob (original) -->
    <g transform="translate(560 220)">
      <path d="M0 30 Q 0 0 26 0 Q 52 0 52 30 Z" fill="#8a4fd6" stroke="#14213d" stroke-width="3" />
      <circle cx="18" cy="16" r="5" fill="#fff" /><circle cx="34" cy="16" r="5" fill="#fff" />
      <circle cx="19" cy="17" r="2" fill="#14213d" /><circle cx="35" cy="17" r="2" fill="#14213d" />
    </g>

    <!-- goal flag -->
    <rect x="750" y="110" width="6" height="140" fill="#14213d" />
    <path d="M756 114 L 800 128 L 756 142 Z" fill="#f08a24" stroke="#14213d" stroke-width="3" />
    <circle cx="753" cy="108" r="7" fill="#ffd54a" stroke="#14213d" stroke-width="3" />

    <!-- numbered call-outs -->
    <g style="font-size:20px;font-weight:900"   text-anchor="middle" fill="#fff">
      <g><circle cx="60" cy="150" r="17" fill="#2563eb" stroke="#14213d" stroke-width="3" /><text x="60" y="157">1</text></g>
      <g><circle cx="248" cy="124" r="17" fill="#2e9e4f" stroke="#14213d" stroke-width="3" /><text x="248" y="131">2</text></g>
      <g><circle cx="586" cy="184" r="17" fill="#d64545" stroke="#14213d" stroke-width="3" /><text x="586" y="191">3</text></g>
      <g><circle cx="780" cy="80" r="17" fill="#f08a24" stroke="#14213d" stroke-width="3" /><text x="780" y="87">4</text></g>
      <g><circle cx="380" cy="286" r="17" fill="#d64545" stroke="#14213d" stroke-width="3" /><text x="380" y="293">5</text></g>
    </g>
    <text style="font-size:15px;font-weight:900" x="380" y="240" text-anchor="middle"   fill="#14213d">掉下去！</text>
    <text style="font-size:12px;font-weight:700" x="12" y="320"   fill="#fff" opacity=".9">原創示意圖（非遊戲截圖）</text>
  </svg>
</template>

<style scoped>
.lvl { width: 100%; border: 3px solid var(--ink); border-radius: 6px; box-shadow: 6px 6px 0 var(--ink); background: #e8f3ff; }
</style>

