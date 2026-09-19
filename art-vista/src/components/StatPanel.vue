<template>
  <div ref="rootEl" class="stat-panel" :class="[`stat-panel--${theme}`, { 'is-active': isActive, 'is-idle': isIdle, 'is-dormant': isDormant, 'has-media': !!$slots.media }]">
    <!--
      A "depth field" of images around the text: big ones near (sharp, bright),
      small ones far (dim, soft). Placed by a packing algorithm that forbids
      overlap and keeps the centre clear for the text.
    -->
    <div v-if="placed.length" class="stat-panel__bg" aria-hidden="true">
      <span v-for="art in placed" :key="art.src" class="stat-panel__frame" :style="art.style">
        <img :src="art.src" :width="art.w" :height="art.h" alt="" decoding="async" />
      </span>
    </div>
    <!-- Optional custom backdrop (e.g. 3D phone renders on the last scene) -->
    <div v-if="$slots.media" class="stat-panel__media" aria-hidden="true">
      <slot name="media" />
    </div>

    <div class="stat-panel__text">
      <p class="stat-panel__big">
        <span class="highlight">{{ displayValue }}</span><span v-if="showSuffix" class="stat-panel__suffix">{{ suffix }}</span>
      </p>
      <p v-if="label" class="stat-panel__label">{{ label }}</p>
      <p v-if="caption" class="stat-panel__caption">{{ caption }}</p>
      <!-- extra content under the caption (e.g. store buttons on the last scene) -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, inject, watch, onMounted, onBeforeUnmount } from 'vue';
import { introState } from '@/composables/useIntro';

/**
 * One full-screen "scene" inside the fading HorizontalScroll on the home page.
 * When it becomes the active panel and is on screen: the figure counts up from
 * 0, the label rises in, and the surrounding images settle into place.
 */
const props = defineProps({
  /** Position inside the parent HorizontalScroll (0-based). */
  index: { type: Number, required: true },
  /** Numeric figure to count up to (formatted 2.000.000). Use `text` for non-numeric scenes. */
  value: { type: Number, default: null },
  /** Static big text when there is no number (e.g. "One app"). */
  text: { type: String, default: '' },
  /** Appended after the number once the count finishes, e.g. "+". */
  suffix: { type: String, default: '' },
  /** Small uppercase label under the figure, e.g. "artworks". */
  label: { type: String, default: '' },
  caption: { type: String, default: '' },
  /** Image URLs to scatter around the text (never repeated within the scene). */
  artworks: { type: Array, default: () => [] },
  /** 'dark' (default, on the page background) or 'light' (warm white panel). */
  theme: { type: String, default: 'dark' }
});

const activeIndex = inject('hscrollActive', ref(0));
const hsStatic = inject('hscrollStatic', ref(false));
// In static (mobile / reduced-motion) mode every panel is stacked and visible, so all of them are "active"
const isActive = computed(() => hsStatic.value || activeIndex.value === props.index);

const rootEl = ref(null);
const inView = ref(false);      // at least half the panel on screen (drives the counter)
const isVisible = ref(false);   // any pixel of the panel on screen
const isDormant = ref(true);    // image animations removed entirely (see below)
let observer = null;
let dormantTimer = 0;

/*
 * Only the scene that is on screen AND active keeps its ~38 image animations
 * running. Inactive scenes are already faded out by the parent's cross-fade, so
 * pausing (is-idle) is invisible; once their frames have finished fading the
 * animations are dropped altogether (is-dormant), which releases the
 * compositor layers. In static (mobile) mode every panel is visible, so nothing
 * is paused there.
 */
const isIdle = computed(() => !hsStatic.value && !(isActive.value && isVisible.value));
watch([isActive, isVisible, hsStatic], ([active, visible, stat]) => {
  clearTimeout(dormantTimer);
  if (!visible) { isDormant.value = true; return; }
  if (active || stat) { isDormant.value = false; return; }
  // visible but inactive: wait until the frames have faded out (1s + 19*60ms stagger), then drop layers
  dormantTimer = setTimeout(() => { isDormant.value = true; }, 2500);
}, { immediate: true });

/* ---------- counter ---------- */
const COUNT_MS = 1800;
const current = ref(0);
const showSuffix = ref(false);
let rafId = 0;

function formatNumber(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const displayValue = computed(() => (props.value === null ? props.text : formatNumber(current.value)));

function runCounter() {
  if (props.value === null) return;
  cancelAnimationFrame(rafId);
  showSuffix.value = false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    current.value = props.value;
    showSuffix.value = !!props.suffix;
    return;
  }
  current.value = 0;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / COUNT_MS);
    const eased = 1 - Math.pow(1 - t, 3); // fast start, gentle landing
    current.value = props.value * eased;
    if (t < 1) rafId = requestAnimationFrame(tick);
    else showSuffix.value = !!props.suffix;
  };
  rafId = requestAnimationFrame(tick);
}

// The count only starts once the scene is really on screen (not while it sits below the fold)
watch([isActive, inView], ([active, visible]) => {
  if (active && visible) runCounter();
});

/* ---------- depth-field image layout ---------- */
// Image heights as a fraction of the panel height, by tier. Near = big, far = small.
const TIERS = [
  { share: 0.22, min: 0.24, max: 0.30 },
  { share: 0.33, min: 0.14, max: 0.20 },
  { share: 0.45, min: 0.075, max: 0.115 }
];
const H_MIN = 0.075, H_MAX = 0.30;     // used to derive depth from size
const ROT_MAX = 6;                     // degrees
const ROT_BBOX = 1.14;                 // bounding-box growth allowance for rotation
const MAX_ASPECT_W = 0.28;             // no image wider than this fraction of the panel

const items = shallowRef([]);    // { src, ar, glow }  (loaded image metadata, shuffled once; replaced wholesale)
const placed = shallowRef([]);   // { src, w, h, style }
let resizeObserver = null;
let layoutTimer = 0;

const rand = (a, b) => a + Math.random() * (b - a);

function intersects(a, b, gap) {
  return a.x < b.x + b.w + gap && a.x + a.w + gap > b.x && a.y < b.y + b.h + gap && a.y + a.h + gap > b.y;
}

function rectDistance(a, b) {
  const dx = Math.max(0, Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w)));
  const dy = Math.max(0, Math.max(b.y - (a.y + a.h), a.y - (b.y + b.h)));
  return Math.hypot(dx, dy);
}

/**
 * Greedy packing: place big images first, then medium, then small. Each image
 * tries many random positions and keeps the one farthest from everything already
 * placed (spreads them out, fills holes). If nothing fits, it shrinks and retries.
 */
function layout() {
  const el = rootEl.value;
  if (!el || !items.value.length) return;
  const W = el.clientWidth, H = el.clientHeight;
  if (!W || !H) return;
  const gap = Math.max(10, W * 0.012);
  // Keep the middle clear for the figure + label
  const exclusion = { x: W * 0.24, y: H * 0.29, w: W * 0.52, h: H * 0.42 };

  const list = items.value;
  const n = list.length;
  // Fewer images → let them be a bit bigger so the field still feels full
  const sizeBoost = Math.min(1.35, Math.max(1, Math.sqrt(24 / n)));
  const result = [];
  list.forEach((it, i) => {
    const t = i / n;
    let tier = TIERS[0], acc = 0;
    for (const tr of TIERS) { acc += tr.share; if (t < acc) { tier = tr; break; } }
    let hFrac = rand(tier.min, tier.max) * sizeBoost;

    for (let attempt = 0; attempt < 7; attempt++) {
      let h = hFrac * H, w = h * it.ar;
      if (w > W * MAX_ASPECT_W) { w = W * MAX_ASPECT_W; h = w / it.ar; }
      const bw = w * ROT_BBOX, bh = h * ROT_BBOX;
      let best = null, bestScore = -1;
      for (let c = 0; c < 48; c++) {
        const r = { x: rand(gap, W - bw - gap), y: rand(gap, H - bh - gap), w: bw, h: bh };
        if (intersects(r, exclusion, gap)) continue;
        // one pass: reject on overlap, otherwise score = distance to the nearest placed image
        let ok = true, score = Infinity;
        for (const p of result) {
          if (intersects(r, p, gap)) { ok = false; break; }
          const d = rectDistance(r, p);
          if (d < score) score = d;
        }
        if (!ok) continue;
        if (!result.length) score = rand(0, 1);
        if (score > bestScore) { bestScore = score; best = r; }
      }
      if (best) {
        const depth = Math.min(1, Math.max(0, (h / H - H_MIN) / (H_MAX - H_MIN)));
        result.push({ ...best, src: it.src, glow: it.glow, w: Math.round(w), h: Math.round(h), depth, rotate: rand(-ROT_MAX, ROT_MAX) });
        break;
      }
      hFrac *= 0.82;
    }
  });

  // Nearest on top (they never overlap, but glows may touch)
  placed.value = result.map((p, k) => ({
    src: p.src,
    w: p.w,
    h: p.h,
    style: {
      left: `${Math.round(p.x + (p.w * ROT_BBOX - p.w) / 2)}px`,
      top: `${Math.round(p.y + (p.h * ROT_BBOX - p.h) / 2)}px`,
      zIndex: 1 + Math.round(p.depth * 10),
      '--r': `${p.rotate.toFixed(1)}deg`,
      '--k': k,
      '--depth': p.depth.toFixed(3),
      '--float': `${7 + (k % 4) * 1.3}s`,
      ...(p.glow ? { '--glow': p.glow } : {})
    }
  }));
}

function scheduleLayout() {
  clearTimeout(layoutTimer);
  layoutTimer = setTimeout(layout, 120);
}

/** Load each image once to learn its aspect ratio and dominant colour (for the glow). */
function loadMeta(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve({ src, ar: img.naturalWidth / img.naturalHeight || 0.8, glow: dominantColor(img) });
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Dominant colour: average of a 12×12 downscale (saturated pixels count more),
 * then saturation pushed up so the glow reads on the dark background.
 * One shared sampling canvas for all images (module scope, created lazily).
 */
const SAMPLE_SIZE = 12;
let sampleCtx = null;
function dominantColor(img) {
  try {
    const size = SAMPLE_SIZE;
    if (!sampleCtx) {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      sampleCtx = canvas.getContext('2d', { willReadFrequently: true });
    }
    const ctx = sampleCtx;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    let r = 0, g = 0, b = 0, weight = 0;
    for (let i = 0; i < data.length; i += 4) {
      const R = data[i], G = data[i + 1], B = data[i + 2];
      const max = Math.max(R, G, B), min = Math.min(R, G, B);
      const sat = max ? (max - min) / max : 0;
      const w = 0.15 + sat;
      r += R * w; g += G * w; b += B * w; weight += w;
    }
    const [h, sat, light] = rgbToHsl(r / weight, g / weight, b / weight);
    return `hsl(${Math.round(h)} ${Math.round(Math.min(100, sat * 100 + 30))}% ${Math.round(Math.max(48, Math.min(62, light * 100)))}%)`;
  } catch (_err) {
    return '';
  }
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return [h, s, l];
}

onMounted(() => {
  if ('IntersectionObserver' in window && rootEl.value) {
    observer = new IntersectionObserver(([entry]) => {
      isVisible.value = entry.isIntersecting;
      inView.value = entry.intersectionRatio >= 0.5;
    }, { threshold: [0, 0.5] });
    observer.observe(rootEl.value);
  } else {
    inView.value = true;
    isVisible.value = true;
  }

  if (!props.artworks.length) return;
  const isSmall = window.innerWidth <= 768;
  const pool = [...props.artworks].sort(() => Math.random() - 0.5).slice(0, isSmall ? 10 : props.artworks.length);

  const startLoading = async () => {
    const metas = (await Promise.all(pool.map(loadMeta))).filter(Boolean);
    // Random order → random tier assignment (which images end up big/small)
    items.value = metas;
    layout();

    if ('ResizeObserver' in window && rootEl.value) {
      resizeObserver = new ResizeObserver(scheduleLayout);
      resizeObserver.observe(rootEl.value);
    } else {
      window.addEventListener('resize', scheduleLayout);
    }
  };

  // The 34 downloads/decodes/colour samples wait until the intro's flying logo
  // has landed: the overlay covers the page and this section is two viewports down.
  const introLanded = (s) => s === 'done' || s === 'finished';
  if (introLanded(introState.value)) {
    startLoading();
  } else {
    const stop = watch(introState, (s) => {
      if (introLanded(s)) { stop(); startLoading(); }
    });
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  clearTimeout(layoutTimer);
  clearTimeout(dormantTimer);
  if (observer) observer.disconnect();
  if (resizeObserver) resizeObserver.disconnect();
  window.removeEventListener('resize', scheduleLayout);
});
</script>

<style scoped>
.stat-panel {
  position: relative;
  display: grid;
  place-items: center;
  min-height: calc(100vh - 80px - 24px);
  margin: 80px 0 24px; /* under the fixed header, like the hero cards */
  padding: 40px;
  box-sizing: border-box;
  overflow: hidden;
  isolation: isolate;
}

/* Soft vignette + darker middle so the text stays legible over the images */
.stat-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 55% 45% at center, rgba(0, 8, 30, 0.8) 0%, rgba(0, 8, 30, 0.35) 55%, rgba(0, 8, 30, 0) 100%),
    linear-gradient(180deg, rgba(0, 8, 30, 0.35), rgba(0, 8, 30, 0) 30%, rgba(0, 8, 30, 0) 70%, rgba(0, 8, 30, 0.45));
  z-index: 20;
  pointer-events: none;
}

/* ---------- images ---------- */
.stat-panel__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* Depth: --depth 1 = nearest (big, sharp, bright) … 0 = farthest (small, soft, dim) */
.stat-panel__frame {
  position: absolute;
  display: block;
  line-height: 0;
  isolation: isolate; /* keeps the glow layer behind the image */
  opacity: 0;
  transform: rotate(var(--r, 0deg)) scale(0.86) translateY(18px);
  transition: opacity 1s ease, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--k, 0) * 60ms);
}

.is-active .stat-panel__frame {
  opacity: calc(0.45 + var(--depth, 1) * 0.55);
  transform: rotate(var(--r, 0deg)) scale(1) translateY(0);
}

/* Breathing glow behind each image in the image's own dominant colour; dimmer when far */
.stat-panel__frame::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 16px;
  background: var(--glow, linear-gradient(135deg, #1D88F0, #BF03B0));
  filter: blur(18px);
  opacity: 0;
  z-index: -1;
  animation: artGlow 3.2s ease-in-out infinite;
  animation-delay: calc(var(--k, 0) * -0.6s);
}

.is-active .stat-panel__frame::before {
  opacity: calc(0.35 + var(--depth, 1) * 0.65);
}

@keyframes artGlow {
  0%, 100% { opacity: 0.25; transform: scale(0.96); }
  50%      { opacity: 0.6;  transform: scale(1.06); }
}

.stat-panel__frame img {
  display: block;
  border-radius: 10px;
  outline: 1px solid rgba(255, 255, 255, 0.1);
  outline-offset: -1px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
  /* farther = dimmer and softer */
  /* near = vivid and bright, far = muted, dim and soft */
  filter: saturate(calc(0.65 + var(--depth, 1) * 0.7)) brightness(calc(0.5 + var(--depth, 1) * 0.58)) contrast(calc(0.95 + var(--depth, 1) * 0.1)) blur(calc((1 - var(--depth, 1)) * 2px));
  animation: artFloat var(--float, 8s) ease-in-out infinite;
  animation-delay: calc(var(--k, 0) * -0.9s);
}

@keyframes artFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* Off-screen or inactive scene: freeze the image animations (the frames are at opacity 0 anyway) ... */
.stat-panel.is-idle .stat-panel__frame img,
.stat-panel.is-idle .stat-panel__frame::before {
  animation-play-state: paused;
}

/* ... and once the frames have faded out, drop them so the compositor layers go away.
   animation-name (not animation) so --float/delay values survive for the restart. */
.stat-panel.is-dormant .stat-panel__frame img,
.stat-panel.is-dormant .stat-panel__frame::before {
  animation-name: none;
}

/* ---------- optional media (last scene) ---------- */
.stat-panel__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* ---------- text ---------- */
.stat-panel__text {
  position: relative;
  z-index: 30;
  text-align: center;
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.7s ease 0.1s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
}

.is-active .stat-panel__text {
  opacity: 1;
  transform: none;
}

/* ---------- light theme: warm white panel, dark text, no vignette ---------- */
.stat-panel--light {
  background:
    radial-gradient(ellipse 60% 50% at 50% 45%, #fffdf9 0%, rgba(255, 253, 249, 0) 70%),
    linear-gradient(180deg, #f7f2eb 0%, #efe7dc 100%);
  border-radius: 20px;
}

/* Text column is capped so the phones on either side never touch it */
.stat-panel--light .stat-panel__text {
  max-width: 38%;
}

.stat-panel--light .stat-panel__big {
  font-size: 6.5rem;
  letter-spacing: -2.5px;
}

.stat-panel--light .stat-panel__caption {
  margin: 14px auto 0;
  max-width: 24ch;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.35;
}

.stat-panel--light::before {
  display: none;
}

.stat-panel--light .stat-panel__big,
.stat-panel--light .stat-panel__suffix {
  color: #1a0933;
}

.stat-panel--light .stat-panel__label {
  color: rgba(26, 9, 51, 0.6);
}

.stat-panel--light .stat-panel__caption {
  color: rgba(26, 9, 51, 0.72);
}

.stat-panel__big {
  margin: 0;
  font-size: 6.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  color: #fff;
  font-variant-numeric: tabular-nums; /* digits don't jitter while counting */
}

.highlight {
  background: linear-gradient(45deg, #03C1FD, #B902A7, #03C1FD);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-panel__suffix {
  margin-left: 0.05em;
  color: rgba(255, 255, 255, 0.9);
  animation: suffixIn 0.4s ease both;
}

@keyframes suffixIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: none; }
}

.stat-panel__label {
  margin: 22px 0 0;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
}

.stat-panel__caption {
  margin: 18px 0 0;
  font-size: 1.35rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.72);
}

/* Tablet: the phones take less room, so the text may be wider but must scale down */
@media screen and (max-width: 1100px) {
  .stat-panel--light .stat-panel__text {
    max-width: 52%;
  }

  .stat-panel--light .stat-panel__big {
    font-size: clamp(3rem, 8vw, 6.5rem);
  }

  .stat-panel--light .stat-panel__caption {
    font-size: clamp(1.05rem, 1.8vw, 1.4rem);
  }
}

@media screen and (max-width: 768px) {
  .stat-panel {
    min-height: 60vh;
    margin: 0; /* stacked mid-page: no header gap needed */
    padding: 28px 20px;
  }

  .stat-panel__big,
  .stat-panel--light .stat-panel__big {
    font-size: 3rem;
    letter-spacing: -1px;
  }

  /* The light "One app" scene: text may use the full width, and the phone
     renders flow underneath the text instead of overlaying it */
  .stat-panel--light .stat-panel__text {
    max-width: 100%;
  }

  .stat-panel--light .stat-panel__caption {
    font-size: 1.05rem;
    max-width: 30ch;
  }

  .stat-panel__media {
    position: static;
    order: 2;
    width: 100%;
  }

  .stat-panel__text {
    order: 1;
  }

  .stat-panel__label {
    margin-top: 14px;
    font-size: 0.8rem;
  }

  .stat-panel__caption {
    font-size: 1.05rem;
  }

  /* Mobile stacks the panels statically: show everything */
  .stat-panel__text {
    opacity: 1;
    transform: none;
  }

  .stat-panel__frame {
    opacity: calc(0.45 + var(--depth, 1) * 0.55);
    transform: rotate(var(--r, 0deg));
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-panel__frame img,
  .stat-panel__frame::before { animation: none; }
}
</style>
