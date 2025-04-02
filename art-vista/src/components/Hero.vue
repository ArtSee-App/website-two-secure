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
            🖼️ Understand <span class="highlight-small">Art</span> Better
            <p class="description">Get quick answers for your art-related questions</p>
          </li>
          <li>
            🤳 Scan and Discover
            <p class="description">Instantly identify artworks with just a scan</p>
          </li>
          <li>
            👩‍🎨 Connect with Artists
            <p class="description">Bridge the gap between art lovers and creators</p>
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
      </div>

      <!-- Right Section: Promo Video Component -->
      <div class="promo-video-container">
        <PromoVideo />
      </div>
    </div>
  </div>

  <!-- Newsletter Subscription -->
  <div class="newsletter-section">
    <p v-if="!isSubscribed">Subscribe to our newsletter for the latest art insights</p>
    <p v-else class="success-message">Thank you for subscribing! We'll keep you updated with the latest art insights.</p>
    <form name="newsletter" method="POST" data-netlify="true" class="newsletter-form" @submit.prevent="handleSubmit">
      <input type="hidden" name="form-name" value="newsletter" />
      <div class="form-group">
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
import PromoVideo from '@/components/PromoVideo.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';

library.add(faApple, faAndroid);

export default {
  name: "Hero",
  components: {
    PromoVideo,
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
        // Fallback if OS is not detected
        alert('Unable to detect your operating system. Please choose your app store manually.');
      }
    },
    handleSubmit() {
      // Here you would typically handle the form submission
      // For now, we'll just simulate a successful subscription
      this.isSubscribed = true;
      this.email = '';
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
  padding: 20px 30px;
  margin-top: 100px;
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 1;
}

.hero-container::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(45deg, #03C1FD, #B902A7, #03C1FD);
  background-size: 200% 200%;
  border-radius: 21px;
  z-index: -1;
  animation: gradientAnimation 5s linear infinite;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
}

/* Content wrapper to center the entire content block */
.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Left section styling */
.hero-titles {
  flex: 1;
  /* Allows the left section to take up available space */
  padding-right: 50px;
  /* Spacing between the titles and the video section */
  max-width: 550px;
  /* Maximum width for the left section */
}

/* Main title styling */
.hero-titles h1 {
  font-size: 2.5rem;
  /* Large font size for the main title */
  margin-bottom: 20px;
  /* Space below the title */
  color: white;
  /* White color for the entire title */
  font-weight: 700;
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
  animation: gradientAnimation 5s linear infinite;
  /* Animation applied */
  font-weight: 900;
  /* Extra bold weight for the highlighted text */
  letter-spacing: -0.5px;
  text-shadow: none;
}

/* Keyframes for the gradient animation */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* Styling for the small highlight */
.highlight-small {
  background: linear-gradient(45deg, #03C1FD, #2dc906, #03C1FD);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 5s linear infinite;
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
  justify-content: flex-start;
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

/* Mobile button styling */
@media screen and (max-width: 768px) {
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
    padding: 20px 20px;
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
  }

  /* Ensure the PromoVideo scales correctly within its container */
  .promo-video-container>* {
    width: 100%;
    height: 100%;
  }

  /* Reduce the main title font size */
  .hero-titles h1 {
    font-size: 1.8rem;
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
}

/* Additional Media Query for Smaller Mobile Devices (Optional) */
@media screen and (max-width: 480px) {
  :root {
    --promo-title-margin: 20px;
  }
  
  .hero-container {
    padding: 15px 15px;
    margin-top: 80px;
    width: calc(100% - 10px);
    max-width: none;
    box-sizing: border-box;
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
    transparent 100%
  );
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

@media screen and (max-width: 768px) {
  .newsletter-section {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
  }

  .newsletter-section p {
    font-size: 1.1rem;
    text-align: center;
  }

  .newsletter-form {
    width: 100%;
  }

  .form-group {
    flex-direction: column;
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

@media screen and (max-width: 768px) {
  .success-message {
    text-align: center;
    white-space: normal;
  }
}
</style>
