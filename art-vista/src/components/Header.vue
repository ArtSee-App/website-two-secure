<!-- Header.vue -->
<template>
  <header :class="{ scrolled, 'intro-pending': introPending }">
    <nav>
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <span class="logo-mark">
            <span class="logo-glow" aria-hidden="true"></span>
            <img src="/logo.webp" alt="ArtVista Logo" class="logo" width="40" height="40" />
          </span>
          <!-- Wordmark collapses behind the logo while scrolling (see .logo-text-wrap) -->
          <span class="logo-text-wrap">
            <span class="logo-text">ArtVista</span>
          </span>
        </router-link>
      </div>
      <!-- Desktop Navigation Links -->
      <ul class="nav-links">
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/blog">Blog</router-link></li>
      </ul>
      <!-- Right cluster: app CTA (appears on scroll) + Sign in -->
      <div class="auth-buttons">
        <div class="app-cta" :class="{ visible: showAppCta }" :aria-hidden="!showAppCta">
          <span class="app-cta__label">Get the app</span>
          <a :href="IOS_URL" target="_blank" rel="noopener noreferrer" class="app-cta__store" aria-label="Download on the App Store" :tabindex="showAppCta ? 0 : -1">
            <BrandIcon name="apple" />
          </a>
          <a :href="ANDROID_URL" target="_blank" rel="noopener noreferrer" class="app-cta__store" aria-label="Get it on Google Play" :tabindex="showAppCta ? 0 : -1">
            <BrandIcon name="android" class="android" />
          </a>
        </div>
        <a href="https://portal.artvista.app" target="_blank" rel="noopener noreferrer" class="sign-in-button">Log in</a>
      </div>
      <!-- Mobile: single smart button, shown whenever the hero's store buttons aren't on screen -->
      <button class="app-cta-mobile" :class="{ visible: showAppCta }" :aria-hidden="!showAppCta" :tabindex="showAppCta ? 0 : -1" @click="redirectToAppStore">
        Get the app
      </button>
      <!-- Animated Hamburger Menu Button -->
      <button
        class="hamburger"
        :class="{ active: sidebarOpen }"
        @click="toggleSidebar"
        aria-label="Toggle navigation"
        :aria-expanded="sidebarOpen"
      >
        <span class="bar top-bar"></span>
        <span class="bar middle-bar"></span>
        <span class="bar bottom-bar"></span>
      </button>
    </nav>
    <!-- Hairline under the bar (see .hairline) -->
    <span class="hairline" aria-hidden="true"><span class="hairline__grad"></span></span>
    <!-- Sidebar with Transition -->
    <transition name="slide">
      <div v-if="sidebarOpen" class="sidebar">
        <ul class="sidebar-links">
          <li><router-link to="/blog" @click="closeSidebar">Blog</router-link></li>
          <li><router-link to="/about" @click="closeSidebar">About</router-link></li>
          <li><router-link to="/contact" @click="closeSidebar">Contact</router-link></li>
          <li><a href="https://portal.artvista.app" target="_blank" rel="noopener noreferrer" @click="closeSidebar">Log in</a></li>
          <li><a href="#" @click.prevent="closeSidebar(); redirectToAppStore()">Get the app</a></li>
        </ul>
      </div>
    </transition>
    <!-- Overlay with Transition -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="overlay" @click="closeSidebar"></div>
    </transition>
  </header>
</template>

<script>
import BrandIcon from '@/components/BrandIcon.vue';

import { introState } from '@/composables/useIntro';
import { heroButtonsVisible } from '@/composables/useHeroButtons';

const IOS_URL = 'https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.artvista&hl=en';

export default {
  name: 'Header',
  components: { BrandIcon },
  data() {
    return {
      scrolled: false,
      sidebarOpen: false,
      IOS_URL,
      ANDROID_URL
    };
  },
  computed: {
    /** True until the intro logo has landed here; the real logo stays hidden and the wordmark tucked */
    introPending() {
      return introState.value === 'loading' || introState.value === 'moving';
    },
    /** Header CTA is shown whenever the hero's own store buttons are not on screen */
    showAppCta() {
      return !heroButtonsVisible.value;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 8;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      // Prevent body from scrolling when sidebar is open
      document.body.style.overflow = this.sidebarOpen ? 'hidden' : '';
    },
    closeSidebar() {
      this.sidebarOpen = false;
      document.body.style.overflow = '';
    },
    redirectToAppStore() {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(ua)) {
        window.location.href = ANDROID_URL;
      } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        window.location.href = IOS_URL;
      } else {
        window.open(IOS_URL, '_blank', 'noopener');
      }
    },
    handleKeyDown(event) {
      if (event.key === 'Escape' && this.sidebarOpen) {
        this.closeSidebar();
      }
    }
  }
};
</script>

<style scoped>
/* Header: full-width solid bar in the page background colour (no floating pill) */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* Same horizontal grid as #app (max-width 1600px, 40px side padding) so the
     logo and buttons line up with the page sections below */
  padding: 12px 40px;
  box-sizing: border-box;
  background: #00081E;
  z-index: 1000;
}

/*
  Hairline under the bar: blue<->purple gradient that keeps drifting; fades in on
  scroll. The drift is a transform on a 3x-wide strip (compositor only) rather
  than an animated background-position (main-thread paint every frame).
*/
.hairline {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  overflow: hidden;
  opacity: 0.7;
  transform: scaleX(0);
  transform-origin: left center;
  /* ease-in: starts slow, accelerates to the right edge */
  transition: transform 0.7s cubic-bezier(0.7, 0, 0.9, 0.4);
  pointer-events: none;
}

header.scrolled .hairline {
  transform: scaleX(1);
}

/* 3W strip = 1.5 gradient periods; translating -2W (one period) per 6s loops seamlessly */
.hairline__grad {
  position: absolute;
  inset: 0;
  width: 300%;
  background: linear-gradient(90deg, #1D88F0, #BF03B0, #1D88F0, #BF03B0);
  animation: lineDrift 6s linear infinite;
  will-change: transform;
}

/* Nothing to see while the line is collapsed: don't tick the animation */
header:not(.scrolled) .hairline__grad {
  animation-play-state: paused;
}

@keyframes lineDrift {
  from { transform: translateX(0); }
  to   { transform: translateX(-66.667%); }
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1520px; /* 1600px - 2 × 40px, matches #app's content box */
  margin: 0 auto;
  position: relative;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-left: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-left: 0;
}

.logo-mark {
  position: relative;
  display: inline-flex;
  z-index: 1; /* the wordmark slides underneath it */
}

.logo {
  height: 40px;
  position: relative;
  z-index: 1;
}

/*
  Glow behind the logo, in the same blue→purple as the logo's stroke.
  Hidden at the top of the page; once the wordmark tucks in (header.scrolled)
  it fades in and breathes so the mark feels alive.
*/
.logo-glow {
  position: absolute;
  inset: -6px;
  opacity: 0;
  transition: opacity 0.8s ease; /* fade in when the wordmark tucks in, fade out when it returns */
}

.logo-glow::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1D88F0, #BF03B0);
  filter: blur(9px);
  animation: logoBreathe 2.8s ease-in-out infinite;
  animation-play-state: paused;
}

header.scrolled .logo-glow {
  opacity: 1;
}

header.scrolled .logo-glow::before {
  animation-play-state: running;
}

@keyframes logoBreathe {
  0%, 100% { opacity: 0.35; transform: scale(0.94); }
  50%      { opacity: 0.7;  transform: scale(1.04); }
}

@media (prefers-reduced-motion: reduce) {
  .logo-glow::before,
  .hairline__grad {
    animation: none;
  }
  .logo-glow::before {
    opacity: 0.6;
  }
}

/*
  Wordmark reveal/collapse. The wrapper is a 1-column grid whose track animates
  1fr -> 0fr, so the text's width shrinks smoothly while the text itself slides
  left "behind" the logo and fades out.
*/
.logo-text-wrap {
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  margin-left: 10px;
  transition: grid-template-columns 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              margin-left 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-text {
  min-width: 0;
  white-space: nowrap;
  color: white;
  font-size: 30px;
  font-weight: 350;
  font-family: 'Judson', serif;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.35s ease;
}

header.scrolled .logo-text-wrap,
header.intro-pending .logo-text-wrap {
  grid-template-columns: 0fr;
  margin-left: 0;
}

header.scrolled .logo-text,
header.intro-pending .logo-text {
  transform: translateX(-16px);
  opacity: 0;
}

/* The intro overlay's logo is flying in; hide ours until it lands */
header.intro-pending .logo-mark {
  visibility: hidden;
}

.nav-links {
  display: flex;
  list-style-type: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 0;
}

/*
  "Get the app" split pill. Hidden while the hero's own store buttons are on
  screen; otherwise it slides in next to "Log in".
*/
.app-cta {
  display: flex;
  align-items: center;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  overflow: hidden;
  opacity: 0;
  transform: translateX(12px);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-cta.visible {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.app-cta__label {
  padding: 0 14px 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
}

.app-cta__store {
  display: grid;
  place-items: center;
  width: 40px;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 17px;
  transition: background 0.2s ease;
}

.app-cta__store:hover {
  background: rgba(255, 255, 255, 0.1);
}

.app-cta__store .android {
  color: #3ddc84;
}

.app-cta-mobile {
  display: none;
}

.sign-in-button {
  color: #00081E;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 9px 18px;
  border-radius: 999px;
  transition: background 0.2s ease;
  background: #fff;
}

.sign-in-button:hover {
  background: rgba(255, 255, 255, 0.85);
}

.nav-links li {
  margin-left: 28px;
}

.nav-links a {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #fff;
}

.nav-links .partners-button a {
  background-color: #ff4081; /* Example color */
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-links .partners-button a:hover {
  background-color: #e91e63; /* Darker shade on hover */
}

a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

/* Hamburger menu */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002; /* Ensure it's above the overlay */
}

.hamburger .bar {
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Hamburger animation when active */
.hamburger.active .top-bar {
  transform: translateY(8.5px) rotate(45deg);
}

.hamburger.active .middle-bar {
  opacity: 0;
}

.hamburger.active .bottom-bar {
  transform: translateY(-8.5px) rotate(-45deg);
}

/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  padding-top: 60px;
  transition: transform 0.3s ease;
  z-index: 1001;
}

.sidebar-links {
  list-style: none;
  padding: 0;
}

.sidebar-links li {
  margin: 20px 0;
  text-align: center;
}

.sidebar-links a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}

.sidebar-links .partners-button a {
  background-color: #ff4081; /* Example color */
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar-links .partners-button a:hover {
  background-color: #e91e63; /* Darker shade on hover */
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Transition for sidebar sliding */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0%);
}

/* Transition for overlay fading */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Responsive design */
/* Tablet: nav + "Get the app" pill + login don't fit side by side; drop the pill */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  header {
    padding: 12px 24px;
  }

  .app-cta,
  .app-cta.visible {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .nav-links {
    display: none;
  }

  .auth-buttons {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .app-cta-mobile {
    display: block;
    margin-left: auto;
    margin-right: 18px;
    padding: 8px 14px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    background: transparent;
    color: #fff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    opacity: 0;
    transform: translateX(8px);
    pointer-events: none;
    transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .app-cta-mobile.visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }

  header {
    padding: 10px 20px; /* #app uses 20px side padding on mobile */
  }

  .sidebar {
    width: 200px;
  }

  .sidebar-links li {
    margin: 15px 0; /* Adjusted for smaller screens */
  }

  .sidebar-links a {
    font-size: 18px;
  }

  /* Optional: Become Partners button styling in sidebar */
  .sidebar-links .partners-button a {
    background-color: #ff4081;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .sidebar-links .partners-button a:hover {
    background-color: #e91e63;
  }
}
</style>
