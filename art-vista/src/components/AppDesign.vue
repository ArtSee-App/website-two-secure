<template>
  <div class="app-design-section">
    <section class="app-design">
      <div class="text-content">
        <h2 class="section-title">Your Personal Art Guide</h2>
        <p class="section-subtitle">With every touch, ArtVista will personalize your art experience.</p>

        <div class="features-list">
          <div class="feature-item">
            <span class="feature-icon">🖼️</span>
            <div class="feature-text">
              <h4>Understand Art Better</h4>
              <p>Get quick answers for your art-related questions.</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🤳</span>
            <div class="feature-text">
              <h4>Scan and Discover</h4>
              <p>Instantly identify artworks with just a scan.</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">👩‍🎨</span>
            <div class="feature-text">
              <h4>Connect with Artists</h4>
              <p>Bridge the gap between art lovers and creators.</p>
            </div>
          </div>
        </div>
      </div>
      <img :src="promoGif" alt="ArtVista App Promotion" class="promo-gif" />
    </section>
  </div>
</template>

<script setup>
import promoGif from '@/assets/promo.gif';
</script>

<style scoped>
/* Section wrapper */
.app-design-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}

/* App Design Section */
.app-design {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  min-height: 600px;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 1;
  width: 100%;
  isolation: isolate; /* Create a new stacking context */
}

.app-design::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/Bubbles.png");
  background-size: cover;
  background-position: center;
  transform: scaleX(-1); /* Flip the background image horizontally */
  z-index: -1; /* Place it behind the content */
}

.text-content {
  max-width: 40%;
  text-align: left;
}

/* Section title */
.section-title {
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}

/* Section subtitle */
.section-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.promo-gif {
  max-width: 50%;
  max-height: 500px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Features List */
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


/* *** Media Queries for Responsive Design *** */

/* Tablet Devices (max-width: 1024px) */
@media screen and (max-width: 1024px) {
  .app-design {
    min-height: 500px;
    align-items: center;
  }
  .promo-gif {
    max-width: 45%;
  }
  .text-content {
    max-width: 45%;
  }
  .feature-text h4 {
    font-size: 1.1rem;
  }
  .feature-text p {
    font-size: 0.9rem;
  }
}

/* Mobile Devices (max-width: 768px) */
@media screen and (max-width: 768px) {
  .app-design {
    flex-direction: column; /* Stack elements vertically */
    text-align: center;
    min-height: auto;
    padding: 30px 20px;
    margin: 30px 0;
  }

  .text-content {
    max-width: 100%;
    margin-bottom: 30px;
  }

  .section-title, .section-subtitle {
    text-align: center;
  }

  .features-list {
    text-align: left;
  }

  .promo-gif {
    max-width: 100%;
    border-radius: 15px;
  }
}

/* Mobile Phones (max-width: 480px) */
@media screen and (max-width: 480px) {
  .app-design {
    margin: 0;
    padding: 20px;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
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
}
</style>
