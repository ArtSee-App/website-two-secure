<template>
  <section
    ref="sectionEl"
    class="hscroll"
    :class="[`hscroll--${mode}`, { 'hscroll--static': isStatic }]"
    :style="sectionStyle"
  >
    <!--
      Invisible snap targets, one per panel, each a full viewport further down.
      With `scroll-snap-type: y mandatory` on <html> the browser settles on one
      of them, so the section always rests on a whole panel.
    -->
    <template v-if="!isStatic">
      <div
        v-for="i in panelCount"
        :key="i"
        class="hscroll__snap"
        :style="{ top: `calc(${(i - 1) * 100}vh + ${HEADER_OFFSET}px)` }"
        aria-hidden="true"
      ></div>
    </template>

    <!-- Pinned viewport: stays put while the section scrolls through -->
    <div class="hscroll__sticky">
      <div ref="trackEl" class="hscroll__track">
        <slot />
      </div>
      <div v-if="!isStatic && hint" class="hscroll__hint" :class="{ 'is-offscreen': !hintOnScreen }" aria-hidden="true">
        <span class="hscroll__chevron"></span>
      </div>
    </div>
  </section>
</template>

<script>
/** Fixed header (64px) + breathing room. Snap positions leave this much room at the top. */
const HEADER_OFFSET = 80;
const shared = {
  instances: [],        // mounted non-static sections (for the mouse-wheel stepping below)
  lastWheelAt: 0,
  stepUntil: 0,         // while a programmatic step is in flight, wheel input is ignored
  restStart: Infinity   // scrollY of the first snap after the sections (plain scrolling below it)
};

/**
 * Mouse-wheel stepping. Trackpads scroll natively and the browser snaps to the
 * nearest panel. A single mouse-wheel notch (~100px) is less than half a panel,
 * so the browser would snap straight back — instead an isolated notch steps
 * one snap position in its direction. Isolated = no wheel event in the last
 * 80ms and a sizeable delta; trackpad streams arrive every ~16ms.
 */
function onWheelStep(event) {
  if (event.ctrlKey || event.deltaMode !== 0) return;
  const now = performance.now();
  const isolated = now - shared.lastWheelAt > 80;
  shared.lastWheelAt = now;
  if (now < shared.stepUntil) { event.preventDefault(); return; }
  if (!isolated || Math.abs(event.deltaY) < 60) return;

  const positions = allSnapPositions();
  if (!positions.length) return;
  const restStart = Math.max(...positions); // last snap page; plain scrolling below it
  const y = window.scrollY;
  if (y > restStart + 1) return; // past the snapped sections: plain scrolling

  const down = event.deltaY > 0;
  const next = down
    ? positions.filter(p => p > y + 2).sort((a, b) => a - b)[0]
    : positions.filter(p => p < y - 2).sort((a, b) => b - a)[0];
  if (next === undefined) return;

  event.preventDefault();
  shared.stepUntil = now + 650;
  window.scrollTo({ top: next, behavior: 'smooth' });
}

let wheelBound = false;
function setWheelStepping(on) {
  if (on === wheelBound) return;
  wheelBound = on;
  if (on) window.addEventListener('wheel', onWheelStep, { passive: false });
  else window.removeEventListener('wheel', onWheelStep);
}

/**
 * Every wheel-step target on the page: the panel positions of each section plus
 * the standalone `.snap-page` blocks that follow them (reviews screen, audience
 * cards). A snap page's position is its top minus the header scroll-padding.
 */
function allSnapPositions() {
  const fromSections = shared.instances.flatMap(inst => inst.snapPositions());
  if (!fromSections.length) return [];
  const fromPages = Array.from(document.querySelectorAll('[data-snap-page]'))
    .map(el => Math.round(window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET));
  // fallback when there are no snap pages: the first position after the sections
  const afterSections = Math.max(...fromSections) + window.innerHeight - HEADER_OFFSET;
  return [...fromSections, ...(fromPages.length ? fromPages : [afterSections])];
}

function computeRestStart() {
  const positions = allSnapPositions();
  shared.restStart = positions.length ? Math.max(...positions) : Infinity;
}

/**
 * The non-passive wheel listener makes the browser wait for the main thread on
 * every wheel event, so it is only attached while the page is within the
 * snapped sections — below `restStart` the handler would do nothing anyway.
 */
function syncWheelStepping() {
  setWheelStepping(shared.instances.length > 0 && window.scrollY <= shared.restStart + 1);
}
</script>

<script setup>
import { ref, computed, provide, onMounted, onBeforeUnmount } from 'vue';

/**
 * Scroll-snapped multi-panel section (native scrolling, no wheel hijacking).
 *
 * The section is N viewports tall and pins a one-viewport "stage" inside it.
 * As the page scrolls through, the stage's panels slide sideways
 * (`mode="slide"`) or cross-fade (`mode="fade"`) in direct proportion to the
 * scroll position, and CSS scroll snapping makes the browser settle on whole
 * panels — one wheel tick = one panel, a trackpad flick glides and snaps to
 * the nearest. Everything after the snapped sections is wrapped in
 * `.page-rest`, which is itself a snap area, so normal scrolling resumes.
 *
 * The active panel index is provided as `hscrollActive` for panels that want
 * to animate their own content in.
 *
 * On mobile (<= 768px) and for users who prefer reduced motion the panels
 * simply stack vertically and nothing snaps.
 */
const props = defineProps({
  /** 'slide' (sideways track) or 'fade' (panels stacked, cross-fade). */
  mode: { type: String, default: 'slide' },
  /** Horizontal gap between panels in slide mode, in px. */
  gap: { type: Number, default: 48 },
  /** Show the little chevron under the panels. */
  hint: { type: Boolean, default: true },
  /** Easing per frame for the visual follow (0–1). Lower = panels trail the scroll more slowly. */
  ease: { type: Number, default: 0.12 }
});

const sectionEl = ref(null);
const trackEl = ref(null);

const isStatic = ref(false);
let target = 0;              // 0 … count-1, exact position from the scroll
let shown = 0;               // eased follow of `target`, what is actually rendered (plain number: written from rAF, see render())
const panelWidth = ref(0);
const panelCount = ref(1);
const hintOnScreen = ref(true); // chevron only bobs while this section is on screen

const activeIndex = ref(0);  // Math.round(shown), updated by render()
provide('hscrollActive', activeIndex);
provide('hscrollStatic', isStatic);

// Weak devices: settle the follow in ~10 frames instead of ~54 (snapping/stepping unchanged)
const lowPower = document.documentElement.classList.contains('low-power');
const ease = lowPower ? 0.4 : props.ease;

const sectionStyle = computed(() => ({
  '--hs-gap': `${props.gap}px`,
  ...(isStatic.value ? {} : { height: `${panelCount.value * 100}vh` })
}));

let scrollRaf = 0;
let animRaf = 0;
let resizeObserver = null;
let snappingEnabled = false;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const me = {
  /** Absolute scrollY of each of this section's snap positions */
  snapPositions: () => {
    const top = window.scrollY + sectionEl.value.getBoundingClientRect().top;
    return Array.from({ length: panelCount.value }, (_, i) => Math.round(top + i * window.innerHeight));
  }
};

function setSnapping(on) {
  if (on === snappingEnabled) return;
  snappingEnabled = on;
  if (on) shared.instances.push(me);
  else shared.instances = shared.instances.filter(i => i !== me);
  document.documentElement.classList.toggle('snap-scroll', shared.instances.length > 0);
  computeRestStart();
  syncWheelStepping();
}

function measure() {
  isStatic.value = window.innerWidth <= 768 || reducedMotion.matches;
  if (trackEl.value) {
    panelCount.value = trackEl.value.children.length || 1;
    panelWidth.value = trackEl.value.clientWidth;
  }
  setSnapping(!isStatic.value && panelCount.value > 1);
  computeRestStart();
  update();
  render();
}

/**
 * Write `shown` straight to the DOM (track transform in slide mode, per-panel
 * opacity in fade mode). Done imperatively from the rAF loop so a follow frame
 * touches 1–3 elements instead of invalidating style for the whole subtree.
 */
function render() {
  const track = trackEl.value;
  if (!track) return;
  const kids = track.children;
  if (isStatic.value) {
    track.style.transform = '';
    for (let i = 0; i < kids.length; i++) { kids[i].style.opacity = ''; kids[i].style.visibility = ''; }
  } else if (props.mode === 'slide') {
    track.style.transform = `translate3d(${-shown * (panelWidth.value + props.gap)}px, 0, 0)`;
    // panels fully off the stage are not painted at all
    for (let i = 0; i < kids.length; i++) kids[i].style.visibility = Math.abs(i - shown) >= 1 ? 'hidden' : '';
  } else {
    // 1 at its own index, fading to 0 one panel away; fully faded panels are not painted at all
    for (let i = 0; i < kids.length; i++) {
      const o = Math.max(0, Math.min(1, 1 - Math.abs(i - shown)));
      kids[i].style.opacity = String(o);
      kids[i].style.visibility = o === 0 ? 'hidden' : '';
    }
  }
  const idx = Math.round(shown);
  if (idx !== activeIndex.value) activeIndex.value = idx;
}

function update() {
  if (isStatic.value || !sectionEl.value) {
    target = 0;
    shown = 0;
    render();
    return;
  }
  const top = sectionEl.value.getBoundingClientRect().top; // section top relative to viewport
  const progress = -top / window.innerHeight;             // viewports scrolled into the section
  hintOnScreen.value = top < window.innerHeight && -top < panelCount.value * window.innerHeight;
  target = Math.min(panelCount.value - 1, Math.max(0, progress));
  startFollow();
}

/** Ease `shown` toward `target` so the panels trail the scroll a little (calmer than 1:1) */
function startFollow() {
  if (animRaf) return;
  const step = () => {
    const diff = target - shown;
    if (Math.abs(diff) < 0.005) {
      shown = target;
      render();
      animRaf = 0;
      return;
    }
    shown += diff * ease;
    render();
    animRaf = requestAnimationFrame(step);
  };
  animRaf = requestAnimationFrame(step);
}

function onScroll() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    update();
    syncWheelStepping();
  });
}

onMounted(() => {
  measure();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', measure);
  reducedMotion.addEventListener('change', measure);
  if ('ResizeObserver' in window && trackEl.value) {
    resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(trackEl.value);
  }
});

onBeforeUnmount(() => {
  setSnapping(false);
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', measure);
  reducedMotion.removeEventListener('change', measure);
  if (resizeObserver) resizeObserver.disconnect();
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
  if (animRaf) cancelAnimationFrame(animRaf);
});
</script>

<style scoped>
.hscroll {
  position: relative;
  width: 100%;
}

.hscroll__snap {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  scroll-snap-align: start;
  pointer-events: none;
}

.hscroll__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

/* ---- slide mode: panels side by side on a moving track ---- */
.hscroll--slide .hscroll__track {
  display: flex;
  align-items: stretch;
  gap: var(--hs-gap, 48px);
  will-change: transform;
}

.hscroll--slide .hscroll__track > :deep(*) {
  flex: 0 0 100%;
  min-width: 0;
}

/* ---- fade mode: panels stacked in one cell, opacity follows the scroll position ---- */
.hscroll--fade .hscroll__track {
  display: grid;
}

.hscroll--fade .hscroll__track > :deep(*) {
  grid-area: 1 / 1;
  /* opacity is written inline by render(): 1 at its own index, 0 one panel away */
  will-change: opacity;
  pointer-events: none;
}

.hscroll--fade .hscroll__track > :deep(.is-active) {
  pointer-events: auto;
}

/* ---- scroll hint ---- */
.hscroll__hint {
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  animation: hintBob 2s ease-in-out infinite;
  opacity: 0.6;
  mix-blend-mode: difference; /* readable over both the dark page and the white scene */
}

/* Section scrolled out of view: nothing to see, stop ticking */
.hscroll__hint.is-offscreen {
  animation-play-state: paused;
}

.hscroll__chevron {
  width: 12px;
  height: 12px;
  border-right: 1.5px solid #fff;
  border-bottom: 1.5px solid #fff;
  transform: translateY(-3px) rotate(45deg);
}

@keyframes hintBob {
  0%, 100% { transform: translate(-50%, 0); }
  50%      { transform: translate(-50%, 6px); }
}

/* ---- fallback: plain vertical stacking (mobile / reduced motion) ---- */
.hscroll--static .hscroll__sticky {
  position: static;
  height: auto;
  overflow: visible;
}

.hscroll--static .hscroll__track {
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: none;
}

/* Stacked panels each carry a 80px "under the fixed header" top margin for the
   desktop layout; when stacked only the first one on the page needs it. */
.hscroll--static .hscroll__track > :deep(*:not(:first-child)) {
  margin-top: 0;
}

.hscroll--static .hscroll__track > :deep(*) {
  grid-area: auto;
  opacity: 1;
  will-change: auto;
  pointer-events: auto;
}

@media (prefers-reduced-motion: reduce) {
  .hscroll__hint { animation: none; }
}
</style>
