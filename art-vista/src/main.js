import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/global.css'; // Global CSS dosyasını ekliyoruz

/*
 * Weak-device heuristic (decorative effects only, see `html.low-power` in global.css).
 * Capability based, no runtime FPS probe: a normal machine under load must not
 * flip into the degraded look. QA override: `?lowpower=1|0` or
 * localStorage 'av-low-power' = '1'|'0'.
 */
const nav = navigator;
const forced = new URLSearchParams(location.search).get('lowpower') ?? localStorage.getItem('av-low-power');
const lowPower = forced !== null
  ? forced === '1'
  : (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4)
    || (nav.deviceMemory > 0 && nav.deviceMemory <= 4)
    || (nav.connection && nav.connection.saveData === true)
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (lowPower) document.documentElement.classList.add('low-power');

createApp(App).use(router).mount('#app');
