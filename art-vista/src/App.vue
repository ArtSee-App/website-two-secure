<template>
  <div id="app">
    <transition name="fade">
      <LoadingScreen v-if="isLoading" />
    </transition>
    <router-view v-show="!isLoading" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingScreen from './components/LoadingScreen.vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2500); // Wait for 2 seconds before starting the fade-out.
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/*
  This transition applies to the LoadingScreen as it's removed from the DOM.
  The 'v-if' on LoadingScreen triggers the leave animation.
*/
.fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
}

body,
html {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #1a0933;
  color: black;
  scrollbar-width: thin;
  scrollbar-color: #6f2da8 #1a0933;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  min-height: 100vh;
  overflow-x: hidden;
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
    padding: 0 10px;
    width: 100%;
  }
}
</style>
