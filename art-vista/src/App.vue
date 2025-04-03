<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body,
html {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #1a0933;
  /* Site general background color */
  color: black;
  /* General text color */
  scrollbar-width: thin;
  /* For Firefox */
  scrollbar-color: #6f2da8 #1a0933;
  /* Thumb and track color */
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

/* Remove the ::before pseudo-element as we're handling background in global.css */
#app::before {
  display: none;
}

/* Webkit browsers (Chrome, Edge, Safari) */
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
