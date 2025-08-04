<template>
  <div class="art-enthusiasts-section" @click="scrollToTop">
    <section class="art-enthusiasts">
      <div class="text-content">
        <h3 class="pre-title">For art enthusiasts</h3>
        <h2 class="section-title">Your Personal Art Guide</h2>
        <p class="section-subtitle">With every touch, ArtVista will personalize your art experience.</p>

        <div class="features-list">
          <div v-for="(feature, index) in features" :key="index" class="feature-item">
            <span class="feature-icon">{{ feature.icon }}</span>
            <div class="feature-text">
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <img :src="promoGif" alt="ArtVista App Promotion" class="promo-gif" />
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import promoGif from '@/assets/promo.gif';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const features = reactive([
  {
    icon: '🖼️',
    title: 'Understand Art Better',
    description: 'Get quick answers for your art-related questions.'
  },
  {
    icon: '🤳',
    title: 'Scan and Discover',
    description: 'Instantly identify artworks with just a scan.'
  },
  {
    icon: '👩‍🎨',
    title: 'Connect with Artists',
    description: 'Bridge the gap between art lovers and creators.'
  }
]);
</script>

<style scoped>
/* Section styles */
.art-enthusiasts-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 50px;
  cursor: pointer;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.art-enthusiasts-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  padding: 8px; /* stroke width */
  background: linear-gradient(45deg, #1D88F0, #BF03B0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.art-enthusiasts-section:hover::after {
  opacity: 1;
}

.art-enthusiasts {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 600px;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  isolation: isolate;
  z-index: 1;
}

.art-enthusiasts::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("~@/assets/Bubbles.png");
  background-size: cover;
  background-position: center;
  transform: scaleX(-1);
  z-index: -1;
}

/* Text content */
.text-content {
  max-width: 40%;
  text-align: left;
  margin-bottom: 20px;
}

.pre-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.section-title {
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Promo image */
.promo-gif {
  width: 599px;
  height: 449px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Features */
.features-list {
  margin-top: 30px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-icon {
  font-size: 1.8rem;
  margin-right: 15px;
  line-height: 1.2;
}

.feature-text h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 5px;
}

.feature-text p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

/* Mobile Phones (max-width: 480px) */
@media screen and (max-width: 767px) {
  .art-enthusiasts {
    flex-direction: column;
    text-align: center;
    min-height: auto;
    padding: 20px;
    margin: 0;
  }

  .text-content {
    max-width: 100%;
    margin-bottom: 25px;
  }

  .section-title, .section-subtitle, .pre-title {
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .features-list {
    text-align: left;
  }

  .feature-icon {
    font-size: 1.5rem;
  }

  .feature-text h4 {
    font-size: 1rem;
  }

  .feature-text p {
    font-size: 0.85rem;
  }

  .promo-gif {
    width: 100%;
    max-width: 599px;
    height: auto;
    max-height: 449px;
    border-radius: 15px;
  }
}
</style>
