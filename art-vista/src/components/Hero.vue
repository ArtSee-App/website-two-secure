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
            🖼️ A <span class="highlight-small"> Better Alternative</span> to Audio Guides
          </li>
        </ul>
        <!-- Action Buttons for the App -->
        <div class="buttons">
          <!-- Desktop Buttons -->
          <div class="desktop-buttons">
            <a href="https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB" target="_blank"
              rel="noopener noreferrer">
              <button class="get-app-btn">
                <font-awesome-icon :icon="['fab', 'apple']" class="button-icon" /> Available on iOS
              </button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.artvista&hl=en" target="_blank"
              rel="noopener noreferrer">
              <button class="get-app-btn">
                <font-awesome-icon :icon="['fab', 'android']" class="button-icon android-icon" /> Available on
                Android
              </button>
            </a>
          </div>

          <!-- Mobile Single Button -->
          <div class="mobile-button" v-if="isMobile">
            <button class="get-app-btn" @click="redirectToAppStore">Get the App</button>
          </div>
        </div>
        <div class="iphone-container">
          <img src="@/assets/Website Image (3).png" alt="ArtVista Website on a screen" class="iphone-image" />
        </div>
      </div>

      <!-- Right Section: Promo Video Component -->
    </div>
  </div>

  <!-- Newsletter Subscription -->
  <div class="newsletter-section">
    <p v-if="!isSubscribed">Subscribe to our newsletter for the latest insights</p>
    <p v-else class="success-message">Thank you for subscribing! We'll keep you updated with the latest art insights.</p>
    <form name="newsletter" method="POST" data-netlify="true" class="newsletter-form" @submit.prevent="handleSubmit">
      <input type="hidden" name="form-name" value="newsletter" />
      <div class="form-group" v-if="!isSubscribed">
        <input 
          type="email" 
          name="email" 
          placeholder="Enter your email" 
          required
          class="email-input"
          v-model="email"
        />
        <button type="submit" class="submit-button">Subscribe</button>
      </div>
    </form>
  </div>
</template>

<script>
// Importing the PromoVideo component to be used within the Hero component
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';

library.add(faApple, faAndroid);

export default {
  name: "Hero",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isMobile: false,
      isSubscribed: false,
      email: ''
    }
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIfMobile);
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

    // ◆◆◆ NEW: fetch a short-lived token from your backend ◆◆◆
    async fetchToken() {
      const BASE = process.env.VUE_APP_ARTVISTA_API_BASE_URL;
      const PUBLIC = process.env.VUE_APP_ARTVISTA_PUBLIC_TOKEN;
      const res = await fetch(`${BASE}/get_custom_token/?token=${PUBLIC}`);
      if (!res.ok) throw new Error('Token alınamadı');
      const { id_token } = await res.json();
      return id_token;
    },

    // ◆◆◆ UPDATED: subscribe via your Netlify function ◆◆◆
    async handleSubmit() {
      try {
        // 1️⃣ get JWT
        const token = await this.fetchToken();

        // 2️⃣ build query string
        const params = new URLSearchParams({
          token,
          email_to_save: this.email
        });

        // 3️⃣ call Netlify function (which forwards to /save_email/)
        const res = await fetch(`/.netlify/functions/save_email?${params}`, {
          // GET is default, CORS headers are handled server‐side
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || res.statusText);
        }

        // 4️⃣ on success:
        this.isSubscribed = true;
        this.email = '';
      }
      catch (err) {
        console.error('Subscription error:', err);
        alert('An error occurred. Please try again.');
      }
    }
  }
}
</script>


<style scoped>
/* CSS Variables for Adjustable Margins */
:root {
  --promo-title-margin: 40px;
  /* Default margin between promo video and titles */
}

/* Container styling for the hero section, using flexbox for layout */
.hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 30px 0;
  margin-top: 100px;
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.3);
  background-image: url("~@/assets/Bubbles.png");
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 1;
}



/* Content wrapper to center the entire content block */
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Left section styling */
.hero-titles {
  text-align: center;
  max-width: 800px;
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

/* List container styling */
.hero-titles ul {
  list-style: none;
  /* Remove default list styles */
  padding: 0;
  /* No padding */
}

/* List item styling */
.hero-titles ul li {
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

/* Styling for the "Get App" buttons */
.get-app-btn {
  background-color: #1a0a1f;
  color: white;
  padding: 12px 24px;
  border: 2px solid #6A1D85;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 0 0 auto;
  max-width: 300px;
  width: auto;
  position: relative;
  overflow: hidden;
}

/* Hover state for desktop buttons */
@media screen and (min-width: 769px) {
  .get-app-btn:hover {
    background-color: #6A1D85;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(106, 29, 133, 0.3);
  }
}

.android-icon {
  color: green;
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
.newsletter-section {
  margin-top: 30px;
  padding: 20px 0;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 80%,
    transparent 100%);
}

.newsletter-section p {
  color: #e9e9e9;
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  white-space: nowrap;
  position: relative;
  letter-spacing: -0.2px;
  font-weight: 500;
}

.newsletter-form {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 800px;
}

.form-group {
  display: flex;
  gap: 12px;
  width: 100%;
}

.email-input {
  flex: 1;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #e9e9e9;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  min-width: 300px;
}

.email-input:focus {
  border-color: #03C1FD;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(3, 193, 253, 0.15);
}

.email-input::placeholder {
  color: rgba(233, 233, 233, 0.5);
  font-size: 1rem;
}

.submit-button {
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  backdrop-filter: blur(5px);
  min-width: 120px;
}

.submit-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
  border-radius: 12px;
}

.submit-button:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
}

.submit-button:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.success-message {
  color: #e9e9e9;
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  white-space: nowrap;
  position: relative;
  letter-spacing: -0.2px;
  font-weight: 500;
  animation: fadeIn 0.5s ease;
  text-align: center;
  width: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.iphone-container {
  margin-top: 0px;
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

  /* Mobile button styling */
  .get-app-btn {
    width: 100%;
    max-width: none;
    padding: 15px 0;
    font-size: 1.1rem;
    border-radius: 12px;
    background-color: #1a0a1f;
    border: 2px solid #6A1D85;
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

  .promo-video-container {
    order: 1;
    width: 100%;
    max-width: 100%;
  }

  .hero-titles {
    order: 2;
    padding-right: 0;
    max-width: 100%;
    text-align: center;
    width: 100%;
    margin-top: 20px;
  }

  /* Ensure the PromoVideo scales correctly within its container */
  .promo-video-container>* {
    width: 100%;
    height: 100%;
  }

  /* Reduce the main title font size */
  .hero-titles h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  /* Reduce list item font size */
  .hero-titles ul li {
    font-size: 1rem;
    text-align: center;
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

  .button-icon {
    margin-right: 8px;
    vertical-align: middle;
  }

  .newsletter-section {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .newsletter-section p {
    font-size: 1.1rem;
    text-align: center;
    white-space: normal;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .newsletter-form {
    width: 100%;
  }

  .form-group {
    flex-direction: column;
    width: 100%;
  }

  .email-input {
    min-width: 100%;
    padding: 10px 20px;
  }

  .submit-button {
    width: 100%;
    min-width: 100%;
    padding: 10px 24px;
  }

  .success-message {
    text-align: center;
    white-space: normal;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
}

/* Additional Media Query for Smaller Mobile Devices */
@media screen and (max-width: 480px) {
  :root {
    --promo-title-margin: 20px;
  }

  .hero-container {
    padding: 15px 15px 0;
    margin-top: 80px;
    width: calc(100% - 10px);
    max-width: none;
    box-sizing: border-box;
  }
}
</style>
