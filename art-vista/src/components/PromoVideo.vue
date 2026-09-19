<template>
  <video
    ref="videoEl"
    class="promo-video"
    :src="src"
    :poster="poster"
    :width="width"
    :height="height"
    :aria-label="label"
    :controls="prefersReducedMotion"
    muted
    loop
    playsinline
    preload="none"
  ></video>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Replaces the old 23–46 MB promo GIFs with a small MP4.
 * - `preload="none"` + no `autoplay`: nothing is downloaded until the card
 *   scrolls near the viewport, then we call play() (allowed because muted).
 * - Pauses again when scrolled away to save CPU/battery.
 * - Honours `prefers-reduced-motion`: shows the poster with controls instead.
 */
defineProps({
  src: { type: String, required: true },
  poster: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  label: { type: String, default: 'ArtVista app promotion' }
});

const videoEl = ref(null);
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let observer = null;

onMounted(() => {
  const video = videoEl.value;
  if (!video || prefersReducedMotion) return;

  if (!('IntersectionObserver' in window)) {
    video.play().catch(() => {});
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: '200px 0px' }
  );
  observer.observe(video);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.promo-video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: inherit;
  background: #000;
}
</style>
