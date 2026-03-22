<template>
  <section class="hero-section">
    <div class="hero-header">
      <p class="pre-title">ArtVista API</p>
      <h1 class="hero-title">Artwork Search</h1>
      <p class="hero-subtitle">Upload any image containing a painting and our model will identify it.</p>
    </div>
    <ApiSearch />
  </section>
</template>

<script>
import ApiSearch from './ApiSearch.vue';

export default {
  name: "HeroApi",
  components: { ApiSearch },
};
</script>

<style scoped>
.hero-section {
  color: #fff;
  padding-top: 20px;
  padding-bottom: 60px;
}

.hero-header {
  text-align: center;
  margin-bottom: 36px;
}

.pre-title {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 8px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  margin: 0 0 12px;
  text-shadow:
    0 0 20px rgba(29, 136, 240, 0.7),
    0 0 50px rgba(29, 136, 240, 0.4);
  animation: glowShift 5s infinite alternate ease-in-out;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 1rem;
  margin: 0;
}

@keyframes glowShift {
  0% {
    text-shadow:
      0 0 20px rgba(29, 136, 240, 0.7),
      0 0 50px rgba(29, 136, 240, 0.4);
  }
  100% {
    text-shadow:
      0 0 20px rgba(191, 3, 176, 0.7),
      0 0 50px rgba(191, 3, 176, 0.4);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>
