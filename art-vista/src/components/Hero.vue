<template>
  <div class="hero-container">
    <div class="content-wrapper">
      <!-- Left Section: Titles and Buttons -->
      <div class="hero-titles">
        <h1>
          The <span class="highlight">Art Companion</span><br>
          You Are Looking For
          
        </h1>
        <ul>
          <li>
            <span class="tagline-lead">The most advanced app for artwork recognition and art knowledge,</span><br class="tagline-break">
            <span class="tagline-punch">built to <StreamText class="tagline-stream" :phrases="taglines" :min-hold="2700" :max-hold="3800" /></span>
          </li>
        </ul>
        <!-- Action Buttons for the App -->
        <div ref="storeButtons" class="buttons">
          <!-- Desktop Buttons -->
          <div class="desktop-buttons">
            <a href="https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB" target="_blank"
              rel="noopener noreferrer">
              <button class="get-app-btn">
                <BrandIcon name="apple" class="button-icon" /> Available on iOS
              </button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.artvista&hl=en" target="_blank"
              rel="noopener noreferrer">
              <button class="get-app-btn">
                <BrandIcon name="android" class="button-icon android-icon" /> Available on
                Android
              </button>
            </a>
          </div>

          <!-- Mobile Single Button -->
          <div class="mobile-button" v-if="isMobile">
            <button class="get-app-btn get-app-btn--mobile" @click="redirectToAppStore">
              <span class="store-icons" aria-hidden="true">
                <BrandIcon name="apple" class="button-icon" />
                <BrandIcon name="android" class="button-icon android-icon" />
              </span>
              Get the App
            </button>
          </div>
        </div>
        <div class="iphone-container">
          <img src="@/assets/hero-screen.webp" alt="ArtVista Website on a screen" class="iphone-image" width="899" height="665" loading="eager" fetchpriority="high" />
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import BrandIcon from '@/components/BrandIcon.vue';
import { heroButtonsVisible } from '@/composables/useHeroButtons';
import StreamText from '@/components/StreamText.vue';

export default {
  name: "Hero",
  components: {
    BrandIcon,
    StreamText,
  },
  data() {
    return {
      isMobile: false,
      buttonsObserver: null,
      // Streamed endings after "built to …"
      taglines: [
        'replace the audio guide.',
        'change the boring museum experience.',
        'actually make you learn.',
        'tell you the story behind every artwork.',
        'recognise any painting in a second.',
        'answer the questions the plaque never does.',
        'make every museum visit personal.'
      ]
    }
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
    // Tell the header whether our store buttons are on screen (it shows its own CTA when they aren't)
    if ('IntersectionObserver' in window && this.$refs.storeButtons) {
      this.buttonsObserver = new IntersectionObserver(([entry]) => {
        heroButtonsVisible.value = entry.isIntersecting;
      }, { threshold: 0.5 });
      this.buttonsObserver.observe(this.$refs.storeButtons);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIfMobile);
    if (this.buttonsObserver) this.buttonsObserver.disconnect();
    heroButtonsVisible.value = false;
  },
  methods: {
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    redirectToAppStore() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.artvista&hl=en';
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = 'https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB';
      } else {
        alert('Unable to detect your operating system. Please choose your app store manually.');
      }
    },
  }
}
</script>


<style scoped>
/* Container styling for the hero section, using flexbox for layout */
.hero-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 40px 30px 0;
  margin-top: 80px; /* header is 64px tall → 16px gap */
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.3);
  background-image: var(--bubbles-blue-purple);
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 1;
}



/* Content wrapper to center the entire content block */
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Left section styling */
.hero-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  max-width: 800px;
  text-align: center;
}

/* Main title styling */
.hero-titles h1 {
  font-size: 4rem;
  /* Large font size for the main title */
  margin-bottom: 20px;
  /* Space below the title */
  color: white;
  /* White color for the entire title */
  font-weight: 500;
  /* Bolder weight for the title */
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Styling for the gradient text part of the title */
.highlight {
  background: linear-gradient(45deg, #03C1FD, #B902A7, #03C1FD);
  /* Loop the gradient colors */
  background-size: 200% 200%;
  -webkit-background-clip: text;
  /* Clipping the gradient to text */
  background-clip: text;
  /* Standard property for compatibility */
  -webkit-text-fill-color: transparent;
  /* Filling the text with transparent to show the gradient */
  font-weight: 900;
  /* Extra bold weight for the highlighted text */
  letter-spacing: -0.5px;
  text-shadow: none;
}



/* Styling for the small highlight */
.highlight-small {
  background: linear-gradient(45deg, #03C1FD, #2dc906, #03C1FD);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  letter-spacing: -0.5px;
  text-shadow: none;
}

/* Two-line tagline: a calm lead line, then the punch line that carries the weight */
.tagline-lead {
  color: rgba(255, 255, 255, 0.72);
  font-weight: 400;
}

.tagline-punch {
  display: block;
  color: #fff;
  font-weight: 600;
  font-size: 1.08em;
  /* Reserved height: the streamed phrase grows and shrinks inside this box, so the
     buttons and the phone below never move. One line on wide screens, two below 1100px. */
  min-height: 1.5em;
}

@media screen and (max-width: 1100px) {
  .tagline-punch {
    min-height: 3em; /* two lines at line-height 1.5 */
  }
}

/* The streamed ending: white, italic, same weight — the motion does the work */
.tagline-stream {
  font-style: italic;
  font-weight: 400;
  color: #fff;
}

/* List container styling */
.hero-titles ul {
  list-style: none;
  /* Remove default list styles */
  padding: 0;
  /* No padding */
}

/* List item styling */
.hero-titles ul li {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  margin-bottom: 20px;
  /* Space between list items */
  font-size: 1.2rem;
  /* Font size for list items */
  position: relative;
  /* Required for additional styling */
  font-weight: 500;
  /* Medium weight for list items */
  letter-spacing: -0.2px;
}

/* Description text under each list item */
.hero-titles ul li .description {
  font-size: 0.9rem;
  /* Smaller font size for descriptions */
  color: #aaa;
  /* Light grey color */
  margin-top: 5px;
  /* Space above the description */
  font-weight: 300;
  /* Light font weight for descriptions */
}

/* Button container styling */
.buttons {
  margin-top: 20px;
  /* Space above the buttons */
  display: flex;
  /* Arrange buttons horizontally */
  gap: 20px;
  /* Space between buttons */
  flex-wrap: wrap;
  /* Allow buttons to wrap to the next line if necessary */
  justify-content: center;
  /* Align buttons to the start */
}

/* Desktop Buttons initially visible */
.desktop-buttons {
  display: flex;
  gap: 20px;
  /* Ensure gap is applied specifically to desktop buttons */
}

/* Mobile Button initially hidden */
.mobile-button {
  display: none;
}

/* Store buttons: same language as "Partner with us" / header "Log in" (white pill) */
.get-app-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 26px;
  border: none;
  border-radius: 999px;
  background: #fff;
  color: #00081E;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.button-icon {
  font-size: 1.1rem;
}

/* Hover state for desktop buttons */
@media screen and (min-width: 769px) {
  .get-app-btn:hover {
    background: rgba(255, 255, 255, 0.88);
    transform: translateY(-1px);
  }
}

.get-app-btn:focus-visible {
  outline: 2px solid #1D88F0;
  outline-offset: 3px;
}

.android-icon {
  color: #2e9e4f;
}

/* Container styling for the promo video section */
.promo-video-container {
  flex: 1.2;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 600px;
  overflow: hidden;
}

/* Ensure the PromoVideo scales correctly within its container */
.promo-video-container>* {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Newsletter Section Styling */
/* The phone sits flush on the card's bottom edge */
.iphone-container {
  margin-top: auto;
  width: 100%;
  line-height: 0;
}

.iphone-image {
  max-width: 600px;
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* --- Mobile-specific styles --- */
@media screen and (max-width: 768px) {

  /* Mobile CTA: one comfortable pill with both store marks */
  .get-app-btn--mobile {
    width: min(100%, 340px);
    justify-content: center;
    gap: 12px;
    padding: 16px 28px;
    font-size: 1.05rem;
    font-weight: 600;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.18);
  }

  .get-app-btn--mobile:active {
    transform: scale(0.98);
  }

  .store-icons {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-right: 12px;
    border-right: 1px solid rgba(0, 8, 30, 0.15);
  }

  .hero-container {
    flex-direction: column;
    padding: 20px 20px 0;
    margin-top: 80px;
    width: calc(100% - 20px);
    max-width: none;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
  }

  .content-wrapper {
    flex-direction: column;
    width: 100%;
  }

  .hero-titles {
    order: 2;
    padding-right: 0;
    max-width: 100%;
    text-align: center;
    width: 100%;
    margin-top: 20px;
  }

  /* Reduce the main title font size */
  .hero-titles h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  /* Reduce list item font size; let the tagline wrap naturally on small screens */
  .hero-titles ul li {
    font-size: 1rem;
    text-align: center;
  }

  .tagline-break {
    display: none;
  }

  /* Center and stack the "Get the App" buttons vertically */
  .buttons {
    justify-content: center;
    gap: 15px;
    flex-direction: column;
    align-items: center;
  }

  .desktop-buttons {
    display: none;
  }

  .mobile-button {
    display: block;
    width: 100%;
  }

  /* The screen render is cropped by the card's bottom edge; on a narrow card
     that cut lands mid-phone, so fade it out instead of chopping it */
  .iphone-image {
    -webkit-mask-image: linear-gradient(to bottom, #000 70%, rgba(0, 0, 0, 0) 100%);
    mask-image: linear-gradient(to bottom, #000 70%, rgba(0, 0, 0, 0) 100%);
  }
}

/* Additional Media Query for Smaller Mobile Devices */
@media screen and (max-width: 480px) {
  .hero-container {
    padding: 15px 15px 0;
    margin-top: 80px;
    width: calc(100% - 10px);
    max-width: none;
    box-sizing: border-box;
  }
}
</style>
