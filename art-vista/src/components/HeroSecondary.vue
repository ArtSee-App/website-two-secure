<!--
  Second hero panel: slides in horizontally after the first hero.
  Museum photo on the left fading into the card; partnership copy on the right.
-->
<template>
  <div class="partner-card">
    <div class="partner-card__photo">
      <img
        src="@/assets/statue2.webp"
        alt="Classical statue in a museum gallery"
        width="1400"
        height="1050"
        loading="lazy"
      />
    </div>
    <div class="partner-card__copy">
      <p class="eyebrow">Partnerships</p>
      <h1>
        Museums and exhibitions are already
        <span class="highlight">ditching audio guides</span> for ArtVista
      </h1>
      <button class="partner-btn" :class="{ 'is-highlighted': isHighlighted }" @click="goToContact">
        Partner with us <span class="partner-btn__arrow" aria-hidden="true">&#8594;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// When this panel slides into view, ring the button for a moment to draw the eye
const activeIndex = inject('hscrollActive', ref(0));
const isHighlighted = ref(false);
let highlightTimer = 0;
watch(activeIndex, (i) => {
  if (i === 1) {
    isHighlighted.value = true;
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => { isHighlighted.value = false; }, 1800);
  }
});
onBeforeUnmount(() => clearTimeout(highlightTimer));

function goToContact() {
  router.push({ path: '/Contact', query: { highlight: 'museums' } });
}
</script>

<style scoped>
.partner-card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  margin-top: 80px; /* same header gap as Hero */
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

/* One soft blue glow in the bottom-right corner (blue = trust), like the first card's bubbles */
.partner-card::after {
  content: '';
  position: absolute;
  right: -10%;
  bottom: -30%;
  width: 60%;
  height: 90%;
  background: radial-gradient(ellipse at center, rgba(29, 136, 240, 0.4) 0%, rgba(29, 136, 240, 0) 70%);
  pointer-events: none;
  z-index: -1;
}

/* Photo fills the left column and dissolves into the card toward the right */
.partner-card__photo {
  position: relative;
  min-height: 420px;
}

.partner-card__photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 45%;
  -webkit-mask-image: linear-gradient(to right, #000 40%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to right, #000 40%, rgba(0, 0, 0, 0) 100%);
}

.partner-card__copy {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 56px 64px 56px 24px;
}

.eyebrow {
  margin: 0 0 14px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

h1 {
  margin: 0 0 32px;
  font-size: 2.6rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: #fff;
}

.highlight {
  background: linear-gradient(45deg, #03C1FD, #B902A7, #03C1FD);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
}

/* Same language as the header's "Log in": white pill, dark text */
.partner-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 22px 13px 26px;
  border: none;
  border-radius: 999px;
  background: #fff;
  color: #00081E;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.partner-btn__arrow {
  font-size: 1.1rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

.partner-btn:hover {
  background: rgba(255, 255, 255, 0.88);
  transform: translateY(-1px);
}

.partner-btn:hover .partner-btn__arrow {
  transform: translateX(3px);
}

.partner-btn:focus-visible {
  outline: 2px solid #1D88F0;
  outline-offset: 3px;
}

/* Brief blue→purple ring when the panel arrives (see isHighlighted) */
.partner-btn.is-highlighted {
  animation: partnerRing 1.8s ease-out both;
}

@keyframes partnerRing {
  0%   { box-shadow: 0 0 0 0 rgba(29, 136, 240, 0), 0 0 0 rgba(191, 3, 176, 0); }
  20%  { box-shadow: 0 0 0 4px rgba(29, 136, 240, 0.95), 0 0 28px 6px rgba(191, 3, 176, 0.55); }
  60%  { box-shadow: 0 0 0 4px rgba(191, 3, 176, 0.9), 0 0 22px 4px rgba(29, 136, 240, 0.45); }
  100% { box-shadow: 0 0 0 0 rgba(29, 136, 240, 0), 0 0 0 rgba(191, 3, 176, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .partner-btn.is-highlighted { animation: none; box-shadow: 0 0 0 3px rgba(29, 136, 240, 0.9); }
}

@media screen and (max-width: 768px) {
  .partner-card {
    grid-template-columns: 1fr;
  }

  .partner-card__photo {
    min-height: 240px;
  }

  .partner-card__photo img {
    -webkit-mask-image: linear-gradient(to bottom, #000 45%, rgba(0, 0, 0, 0) 100%);
    mask-image: linear-gradient(to bottom, #000 45%, rgba(0, 0, 0, 0) 100%);
  }

  .partner-card__copy {
    padding: 8px 24px 28px;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-size: 1.6rem;
  }

  .partner-btn {
    width: 100%;
    justify-content: center;
    padding: 15px 0;
    font-size: 1.05rem;
  }
}
</style>
