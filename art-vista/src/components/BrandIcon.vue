<template>
  <svg class="svg-inline--fa" :viewBox="icon.viewBox" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img">
    <path fill="currentColor" :d="icon.d" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

/**
 * The two store glyphs used on the site, inlined so the FontAwesome runtime
 * (~20 KB gz + DOM scanning) is not shipped for two static icons.
 * Path data copied from @fortawesome/free-brands-svg-icons faApple.icon / faAndroid.icon;
 * `.svg-inline--fa` (global.css) reproduces FA's sizing so the pixels are identical.
 */
const ICONS = {
  apple: { viewBox: '0 0 384 512', d: 'M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z' },
  android: { viewBox: '0 0 576 512', d: 'M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55' }
};

const props = defineProps({
  /** 'apple' | 'android' */
  name: { type: String, required: true }
});
const icon = computed(() => ICONS[props.name]);
</script>

<style scoped>
/* Self-contained sizing (same as FontAwesome's .svg-inline--fa): 1em square, sits on the text baseline */
.svg-inline--fa {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  overflow: visible;
  box-sizing: content-box;
}
</style>
