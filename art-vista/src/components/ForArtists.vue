<template>
  <div class="card" @click="openLoginPortal">
    <div class="card-inner">
      <h3 class="pre-title">For artists</h3>
      <h2 class="section-title">Make Your Art Visible</h2>
      <p class="section-subtitle">With ArtVista, showcase your work, gain exposure, and connect with art enthusiasts worldwide.</p>
      <div class="features-list">
        <div v-for="(feature, index) in features" :key="index" class="feature-item">
          <span class="feature-icon">{{ feature.icon }}</span>
          <div class="feature-text">
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
      <img :src="promoGif" alt="ArtVista App Promotion" class="promo-gif" loading="lazy" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import promoGif from '@/assets/promo2.gif';

function openLoginPortal() {
  window.open('https://portal.artvista.app/login', '_blank', 'noopener,noreferrer');
}

const features = reactive([
  {
    icon: '📱',
    title: 'Make Your Art Scannable',
    description: 'Let viewers discover your story with a scan.'
  },
  {
    icon: '💰',
    title: '(Coming Soon) Monetize Your Art',
    description: 'Sell directly to collectors, no commission fees.'
  },
  {
    icon: '🌐',
    title: 'Build Your Network',
    description: 'Connect with artists and enthusiasts worldwide.'
  }
]);
</script>

<style scoped>
.card {
  flex: 1;
  cursor: pointer;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(45deg, #1D88F0, #BF03B0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover::after {
  opacity: 1;
}

.card:hover {
  transform: translateY(-4px);
}

.card-inner {
  position: relative;
  padding: 36px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  isolation: isolate;
}

.card-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("~@/assets/Bubbles (1).png");
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.pre-title {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-weight: 400;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.section-title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 10px;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 28px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.feature-icon {
  font-size: 1.8rem;
  line-height: 1.2;
  flex-shrink: 0;
}

.feature-text h4 {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 4px;
}

.feature-text p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
  margin: 0;
}

.promo-gif {
  width: 100%;
  height: auto;
  border-radius: 16px;
  margin-top: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 24px 4px rgba(255, 255, 255, 0.5);
}

@media screen and (max-width: 767px) {
  .card-inner {
    padding: 24px;
  }

  .section-title {
    font-size: 1.6rem;
  }
}
</style>
