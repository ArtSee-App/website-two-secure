<template>
  <div class="loading-screen">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="ArtVista Logo" class="logo" />
    </div>
  </div>
</template>

<script setup>
// This component is purely presentational, so no script logic is needed.
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0c011e;
  background-image: url('@/assets/Bubbles.png');
  background-size: cover;
  background-position: center;
  z-index: 10000;
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
}

.logo-container {
  position: relative;
  display: inline-block;
}


.logo {
  position: relative;
  display: block;
  width: 150px;
  animation: fadeInOut 4s ease-in-out forwards;
}

@keyframes pulseGlow {
  from {
    transform: scale(1.6);
  }
  to {
    transform: scale(1.9);
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  12.5% { /* 0.5s / 4s */
    opacity: 1;
  }
  62.5% { /* 2.5s / 4s */
    opacity: 1;
  }
  100% { /* 4s / 4s */
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
