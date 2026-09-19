<template>
  <div class="app-shell">
    <!-- Intro overlay; the page renders underneath so the logo can fly to the header -->
    <LoadingScreen v-if="introState !== 'finished'" />
    <router-view />
  </div>
</template>

<script setup>
import LoadingScreen from './components/LoadingScreen.vue';
import { introState } from '@/composables/useIntro';
</script>

<style>
body,
html {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  color: black;
  scrollbar-width: thin;
  scrollbar-color: #6f2da8 #1a0933;
  min-height: 100%;
  width: 100%;
}

#app {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
  min-height: 100vh;
  position: relative;
}

#app::before {
  display: none;
}

body::-webkit-scrollbar {
  width: 8px;
}

body::-webkit-scrollbar-track {
  background: #1a0933;
}

body::-webkit-scrollbar-thumb {
  background-color: #6f2da8;
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb:hover {
  background-color: #5a2299;
}

@media (max-width: 768px) {
  #app {
    padding: 0 20px;
    width: 100%;
  }
}
</style>
