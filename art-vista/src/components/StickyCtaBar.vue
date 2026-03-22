<template>
  <transition name="slide-up">
    <div v-if="isVisible && !dismissed" class="sticky-cta-bar">
      <span class="cta-label">Get ArtVista on your phone</span>

      <div class="cta-buttons">
        <!-- Desktop: two store buttons -->
        <div class="desktop-buttons">
          <a
            href="https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="cta-btn">
              <font-awesome-icon :icon="['fab', 'apple']" class="btn-icon" />
              Available on iOS
            </button>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.artvista&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="cta-btn">
              <font-awesome-icon :icon="['fab', 'android']" class="btn-icon android-icon" />
              Available on Android
            </button>
          </a>
        </div>

        <!-- Mobile: single smart-redirect button -->
        <div class="mobile-button" v-if="isMobile">
          <button class="cta-btn" @click="redirectToAppStore">Get the App</button>
        </div>
      </div>

      <button class="close-btn" @click="dismissed = true" aria-label="Close">&#x2715;</button>
    </div>
  </transition>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';

library.add(faApple, faAndroid);

export default {
  name: 'StickyCtaBar',
  components: { FontAwesomeIcon },
  data() {
    return {
      isVisible: false,
      dismissed: false,
      isMobile: false
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    onScroll() {
      this.isVisible = window.scrollY > 300;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    redirectToAppStore() {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(ua)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.artvista&hl=en';
      } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        window.location.href = 'https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB';
      } else {
        window.open('https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB', '_blank');
      }
    }
  }
};
</script>

<style scoped>
.sticky-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 14px 24px;
  box-sizing: border-box;
  background: rgba(26, 10, 31, 0.92);
  border-top: 1px solid #6A1D85;
  backdrop-filter: blur(12px);
  box-shadow: 0 -4px 24px rgba(106, 29, 133, 0.25);
}

.cta-label {
  color: #e9e9e9;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: -0.1px;
}

.cta-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.desktop-buttons {
  display: flex;
  gap: 12px;
}

.mobile-button {
  display: none;
}

.cta-btn {
  background-color: #1a0a1f;
  color: white;
  padding: 9px 20px;
  border: 1px solid #6A1D85;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.cta-btn:hover {
  background-color: #6A1D85;
  box-shadow: 0 4px 12px rgba(106, 29, 133, 0.4);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 1rem;
}

.android-icon {
  color: #3ddc84;
}

.close-btn {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: rgba(233, 233, 233, 0.5);
  font-size: 1.1rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #e9e9e9;
}

/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .cta-label {
    display: none;
  }

  .desktop-buttons {
    display: none;
  }

  .mobile-button {
    display: block;
  }

  .cta-btn {
    padding: 11px 28px;
    font-size: 1rem;
  }

  .sticky-cta-bar {
    justify-content: center;
    padding: 12px 40px 12px 16px;
  }
}
</style>
