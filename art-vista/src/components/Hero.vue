<template>
  <div class="hero-container">
    <!-- Left Section: Titles and Buttons -->
    <div class="hero-titles">
      <h1>
        The <span class="highlight">Art Companion</span> You Are Looking For
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
          <a href="https://apps.apple.com/nl/app/artvista-art-companion/id6503986684?l=en-GB" target="_blank" rel="noopener noreferrer">
            <button class="get-app-btn">Download on the App Store</button>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.artvista&hl=en" target="_blank" rel="noopener noreferrer">
            <button class="get-app-btn">Get it on Google Play</button>
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
</template>

<script>
// Importing the PromoVideo component to be used within the Hero component
import PromoVideo from '@/components/PromoVideo.vue'

export default {
  name: "Hero",
  components: {
    PromoVideo
  },
  data() {
    return {
      isMobile: false
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
    }
  }
}
</script>

<style scoped>
/* CSS Variables for Adjustable Margins */
:root {
  --promo-title-margin: 40px; /* Default margin between promo video and titles */
}

/* Container styling for the hero section, using flexbox for layout */
.hero-container {
  display: flex;
  justify-content: space-between; /* Space between the two main sections */
  align-items: center; /* Center align the items vertically */
  padding: 40px 0; /* Top and bottom padding */
  margin-top: 50px; /* Added margin to prevent overlap with the fixed header */
  width: 100%;
  max-width: 1200px; /* Maximum width of the container */
  margin-left: auto; /* Center the container horizontally */
  margin-right: auto; /* Center the container horizontally */
}

/* Left section styling */
.hero-titles {
  flex: 1; /* Allows the left section to take up available space */
  padding-right: 100px; /* Spacing between the titles and the video section */
  max-width: 500px; /* Maximum width for the left section */
}

/* Main title styling */
.hero-titles h1 {
  font-size: 2.5rem; /* Large font size for the main title */
  margin-bottom: 20px; /* Space below the title */
  color: white; /* White color for the entire title */
  font-weight: 400; /* Medium weight for the title */
}

/* Styling for the gradient text part of the title */
.highlight {
  background: linear-gradient(45deg, #03C1FD, #B902A7, #03C1FD); /* Loop the gradient colors */
  background-size: 200% 200%;
  -webkit-background-clip: text; /* Clipping the gradient to text */
  background-clip: text; /* Standard property for compatibility */
  -webkit-text-fill-color: transparent; /* Filling the text with transparent to show the gradient */
  animation: gradientAnimation 5s linear infinite; /* Animation applied */
  font-weight: 900; /* Bold weight for the highlighted text */
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
}

/* List container styling */
.hero-titles ul {
  list-style: none; /* Remove default list styles */
  padding: 0; /* No padding */
}

/* List item styling */
.hero-titles ul li {
  margin-bottom: 20px; /* Space between list items */
  font-size: 1.2rem; /* Font size for list items */
  position: relative; /* Required for additional styling */
  font-weight: 300; /* Light font weight for list items */
}

/* Description text under each list item */
.hero-titles ul li .description {
  font-size: 0.9rem; /* Smaller font size for descriptions */
  color: #aaa; /* Light grey color */
  margin-top: 5px; /* Space above the description */
  font-weight: 300; /* Light font weight for descriptions */
}

/* Button container styling */
.buttons {
  margin-top: 20px; /* Space above the buttons */
  display: flex; /* Arrange buttons horizontally */
  gap: 20px; /* Space between buttons */
  flex-wrap: wrap; /* Allow buttons to wrap to the next line if necessary */
  justify-content: flex-start; /* Align buttons to the start */
}

/* Desktop Buttons initially visible */
.desktop-buttons {
  display: flex;
  gap: 20px; /* Ensure gap is applied specifically to desktop buttons */
}

/* Mobile Button initially hidden */
.mobile-button {
  display: none;
}

/* Styling for the "Get App" buttons */
.get-app-btn {
  background-color: #6A1D85; /* Primary button color */
  color: white; /* White text color */
  padding: 10px 20px; /* Padding for the buttons */
  border: none; /* No border */
  border-radius: 10px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: transform 0.3s; /* Smooth transition for hover effects */
  font-weight: 500; /* Medium weight for button text */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Box-shadow for better visual appeal */
  flex: 0 0 auto; /* Prevent buttons from stretching */
  max-width: 300px; /* Maintain maximum width */
  width: auto; /* Allow buttons to size based on content */
}

/* Keyframes for the button gradient animation */
@keyframes buttonGradientAnimation {
  0% {
    background-color: #6A1D85;
  }
  33% {
    background-color: #B902A7;
  }
  66% {
    background-color: #fd7403;
  }
  100% {
    background-color: #6A1D85;
  }
}

/* Hover state for desktop buttons */
@media screen and (min-width: 769px) {
  .get-app-btn:hover {
    animation: buttonBackgroundChange 2s linear infinite; /* Background color animation on hover */
    transform: scale(1.05); /* Slightly increased scale */
  }
}

/* Animation for Button Colors on Hover for Desktop */
@keyframes buttonBackgroundChange {
  0% {
    background-color: #6A1D85;
  }
  33% {
    background-color: #B902A7;
  }
  66% {
    background-color: #fd7403;
  }
  100% {
    background-color: #6A1D85; 
  }
}

/* Container styling for the promo video section */
.promo-video-container {
  flex: 1; /* Allows the promo video section to take up available space */
  aspect-ratio: 4 / 3; /* Maintain 4:3 aspect ratio */
  display: flex;
  justify-content: center; /* Center align horizontally */
  align-items: center; /* Center align vertically */
  margin: var(--promo-title-margin); /* Margin adjustment */
}

/* Responsive design for screens where buttons might not fit horizontally */
@media screen and (max-width: 768px) {
  .hero-container {
    flex-direction: column; /* Stack items vertically */
    padding: 30px 0px; /* Reduce padding */
  }

  .promo-video-container {
    order: 1; /* First in order */
    margin-bottom: var(--promo-title-margin); /* Space below the video */
    width: 100%; /* Full width */
    max-width: 600px; /* Limit max width */
  }

  .hero-titles {
    order: 2; /* Second in order */
    padding-right: 0; /* Remove right padding */
    max-width: 100%; /* Allow full width */
    text-align: center; /* Center align text */
  }

  /* Ensure the PromoVideo scales correctly within its container */
  .promo-video-container > * {
    width: 100vw;
    height: 100%;
  }

  /* Reduce the main title font size */
  .hero-titles h1 {
    font-size: 1.8rem; /* Smaller font size */
    text-align: center; /* Center align text */
  }

  /* Reduce list item font size */
  .hero-titles ul li {
    font-size: 1rem; /* Smaller font size */
    text-align: center; /* Center align text */
  }

  /* Center and stack the "Get the App" buttons vertically */
  .buttons {
    justify-content: center; /* Center the buttons horizontally */
    gap: 15px; /* Maintain spacing between buttons */
    flex-direction: column; /* Stack buttons vertically */
    align-items: center; /* Center align buttons */
  }

  .desktop-buttons {
    display: none; /* Hide desktop buttons on mobile */
  }

  .mobile-button {
    display: block; /* Show mobile button on mobile */
    width: 100%;
  }

  .get-app-btn {
    width: 100%; /* Make buttons full width within their container */
    max-width: none; /* Remove maximum width restriction */
    padding: 15px 0; /* Increase vertical padding for bigger buttons */
    font-size: 1.1rem; /* Increase font size for better readability */
    border-radius: 12px; /* Slightly larger border radius for a more prominent look */
    animation: buttonGradientAnimation 5s linear infinite; /* Continuous color change */
    transform: none; /* Remove transform to prevent interference with the animation */
  }
}

/* Additional Media Query for Smaller Mobile Devices (Optional) */
@media screen and (max-width: 480px) {
  :root {
    --promo-title-margin: 20px; /* Reduced margin for very small screens */
  }
}
</style>
