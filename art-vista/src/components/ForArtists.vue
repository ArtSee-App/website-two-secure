<template>
    <div class="for-artists-section" @click="openLoginPortal">
      <section class="for-artists">
        <div class="text-content">
          <h3 class="pre-title">For artists</h3>
          <h2 class="section-title">Make Your Art Visible</h2>
          <p class="section-subtitle">With ArtVista, showcase your work, gain exposure, and share your contacts to connect with art enthusiasts worldwide.</p>
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
import promoGif from '@/assets/promo2.gif';

function openLoginPortal() {
  window.open('https://portal.artvista.app/login', '_blank', 'noopener,noreferrer');
}

const features = reactive([
  {
      icon: '📱',
      title: 'Make Your Art Scannable',
      description: 'Transform any artwork into an interactive experience. Let viewers discover your story instantly with a simple scan.'
    },
    {
      icon: '💰',
      title: '(Coming Soon) Monetize Your Art',
      description: 'Connect with collectors and sell your creations directly. No commission fees, retain full ownership of your work.'
    },
    {
      icon: '🌐',
      title: 'Build Your Network',
      description: 'Join a community of artists and enthusiasts who appreciate your vision.'
    }
  ]);
  </script>
  
  <style scoped>
/* Section styles */
.for-artists-section {
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

.for-artists-section::after {
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

.for-artists-section:hover::after {
  opacity: 1;
}

.for-artists {
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
  
  .for-artists::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("~@/assets/Bubbles (1).png");
    background-size: cover;
    background-position: center;
    transform: scaleX(-1), scaleY(-1);
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
    .for-artists {
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