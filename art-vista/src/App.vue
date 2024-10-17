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

body, html {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #1a0933; /* Site genel arka plan rengi */
  color: white; /* Genel metin rengi */
}

#app {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
