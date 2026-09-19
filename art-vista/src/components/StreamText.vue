<template>
  <span ref="rootEl" class="stream-text"><span ref="textEl">{{ phrases[0] }}</span><span class="stream-text__caret" :class="{ 'is-idle': !isTyping }" aria-hidden="true"></span></span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { createStreamer } from '@/composables/useStreamer';

/**
 * Cycles through phrases with a "streaming" effect: types one character at a
 * time, holds for a few seconds (longer phrases a bit longer), erases, types the
 * next. Frame-synced (see useStreamer). Loops forever; pauses while off-screen.
 * Honours prefers-reduced-motion (phrases just swap).
 */
const props = defineProps({
  phrases: { type: Array, required: true },
  typeMs: { type: Number, default: 34 },
  eraseMs: { type: Number, default: 16 },
  /** Hold time bounds in ms; actual hold scales with phrase length in between. */
  minHold: { type: Number, default: 4000 },
  maxHold: { type: Number, default: 5200 }
});

const rootEl = ref(null);
const textEl = ref(null);
const isTyping = ref(false);

let index = 0;
let observer = null;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const streamer = createStreamer({
  typeMs: props.typeMs,
  eraseMs: props.eraseMs,
  gapMs: 250,
  reduceMotion,
  holdFor: (text) => Math.min(props.maxHold, Math.max(props.minHold, 2400 + text.length * 40)),
  onPhase: (phase) => { isTyping.value = phase === 'type'; },
  onNext: () => {
    index = (index + 1) % props.phrases.length;
    return props.phrases[index];
  }
});

onMounted(() => {
  const start = () => streamer.start(textEl.value, props.phrases[index], true);
  if ('IntersectionObserver' in window && rootEl.value) {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else streamer.stop();
    }, { threshold: 0.2 });
    observer.observe(rootEl.value);
  } else {
    start();
  }
});

onBeforeUnmount(() => {
  streamer.stop();
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.stream-text {
  white-space: pre-wrap;
}

.stream-text__caret {
  display: inline-block;
  width: 2px;
  height: 0.95em;
  margin-left: 2px;
  vertical-align: -0.12em;
  background: currentColor;
  opacity: 0.8;
}

.stream-text__caret.is-idle {
  animation: streamCaret 1s steps(1) infinite;
}

@keyframes streamCaret {
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .stream-text__caret { display: none; }
}
</style>
