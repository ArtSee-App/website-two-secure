<template>
  <div class="loading-screen" :class="{ 'is-moving': isMoving, 'is-fading': isFading }">
    <div ref="logoBox" class="logo-container" :style="logoStyle">
      <span class="logo-glow" aria-hidden="true"></span>
      <img src="/logo.webp" alt="ArtVista Logo" class="logo" :class="{ 'is-wiggling': isWiggling }" width="150" height="150" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { setIntroState } from '@/composables/useIntro';

/**
 * First-load intro. Timeline (ms):
 *   0    – opaque overlay + centred logo; glow pulses once (see @keyframes introGlow)
 *   900  – a quick playful wiggle
 *   1400 – logo flies/scales to the header's logo position (overlay stays opaque)
 *   2200 – landed: header takes over (real logo + wordmark), overlay fades out
 *   2900 – overlay removed
 * If the header logo can't be found (or reduced motion), it just fades out.
 */
const WIGGLE_AT_MS = 900;
const MOVE_AT_MS = 1400;
const MOVE_MS = 900;
const FADE_MS = 700;

const logoBox = ref(null);
const isWiggling = ref(false);
const isMoving = ref(false);
const isFading = ref(false);
const logoStyle = ref({});
const timers = [];

function startMove() {
  const target = document.querySelector('header .logo');
  const source = logoBox.value ? logoBox.value.querySelector('.logo') : null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (target && source && !reduceMotion) {
    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const scale = to.width / from.width;
    logoStyle.value = {
      transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})`
    };
  } else {
    logoStyle.value = { opacity: 0 };
  }
  isMoving.value = true;
  setIntroState('moving');
  timers.push(setTimeout(() => {
    // Logo has landed exactly over the header's logo: reveal the page beneath
    setIntroState('done');
    isFading.value = true;
    timers.push(setTimeout(() => setIntroState('finished'), FADE_MS));
  }, MOVE_MS));
}

onMounted(() => {
  timers.push(setTimeout(() => { isWiggling.value = true; }, WIGGLE_AT_MS));
  timers.push(setTimeout(startMove, MOVE_AT_MS));
});

onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00081E;
  z-index: 10000;
  overflow: hidden;
  pointer-events: none;
  transition: background-color 0.7s ease;
}

.loading-screen.is-fading {
  background-color: transparent;
}

.logo-container {
  position: relative;
  width: 150px;
  height: 150px;
  transform-origin: top left;
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.6s ease;
  will-change: transform;
}

.logo {
  position: relative;
  display: block;
  width: 150px;
  height: 150px;
  z-index: 1;
  animation: logoIn 0.5s ease-out both;
}

/* Glow in the logo's own blue→purple; one soft pulse, then settles low */
.logo-glow {
  position: absolute;
  inset: -10px;
  border-radius: 34px;
  background: linear-gradient(135deg, #1D88F0, #BF03B0);
  filter: blur(22px);
  opacity: 0;
  animation: introGlow 1.3s ease-in-out both;
}

/* Glow stays on (softly) while the logo flies, and goes out once it has landed */
.is-moving .logo-glow {
  animation: none;
  opacity: 0.3;
  transition: opacity 0.5s ease;
}

.is-fading .logo-glow {
  opacity: 0;
}

@keyframes introGlow {
  0%   { opacity: 0;    transform: scale(0.92); }
  45%  { opacity: 0.6;  transform: scale(1.06); }
  100% { opacity: 0.3;  transform: scale(1); }
}

.logo.is-wiggling {
  animation: logoWiggle 0.5s ease-in-out both;
}

@keyframes logoWiggle {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(-7deg) scale(1.05); }
  55%  { transform: rotate(6deg) scale(1.05); }
  80%  { transform: rotate(-3deg) scale(1.02); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes logoIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .logo-glow { animation: none; opacity: 0.4; }
  .logo, .logo.is-wiggling { animation: none; }
}
</style>
