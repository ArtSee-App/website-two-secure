<template>
  <div class="museums-wrapper">
    <div class="teaser-card" @click="goToContact">
      <div class="teaser-inner">
        <div class="teaser-text">
          <h3 class="pre-title">For museums</h3>
          <h2 class="section-title">Enhance Visitor Experience</h2>
          <p class="section-subtitle">Transform your museum into an interactive digital experience that engages visitors through their smartphones.</p>
        </div>
        <div class="teaser-cta">
          <span>Contact us</span>
          <span class="arrow">&#8594;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToContact() {
  router.push({ path: '/Contact', query: { highlight: 'museums' } });
}
</script>

<style scoped>
.museums-wrapper {
  width: 100%;
  margin-bottom: 50px;
}

/* Teaser */
.teaser-card {
  cursor: pointer;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.teaser-card::after {
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

.teaser-card:hover::after {
  opacity: 1;
}

.teaser-card:hover {
  transform: translateY(-4px);
}

.teaser-inner {
  position: relative;
  padding: 36px 44px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  isolation: isolate;
}

.teaser-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("~@/assets/Bubbles (2).png");
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.7;
}

.teaser-text {
  max-width: 70%;
}

.teaser-cta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.teaser-card:hover .teaser-cta {
  color: white;
}

.arrow {
  font-size: 1.3rem;
  transition: transform 0.2s ease;
}

.teaser-card:hover .arrow {
  transform: translateX(4px);
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


@media screen and (max-width: 767px) {
  .teaser-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
  }

  .teaser-text {
    max-width: 100%;
  }

.section-title {
    font-size: 1.6rem;
  }
}
</style>
