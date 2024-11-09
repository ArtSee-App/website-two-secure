<!-- HeroApi.vue -->
<template>
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-left">
        <div class="hero-content">
          <h1 class="hero-title">
            The Eye of ArtVista
            <span class="emoji">👁️</span>
            <span class="emoji">🖼️</span>
          </h1>
          <h2 class="hero-subtitle">
            Image Search API
          </h2>
          <p class="mobile-only-message">
            You know that you can just install the app and play with the camera there? 🤔🤔🤔
          </p>
          <!-- Dedicated Container for Bullet Points -->
          <div class="bullets-container">
            <div class="hero-bullets">
              <div
                class="hero-bullet"
                :class="{ active: currentActiveIndex === index }"
                @mouseenter="onHover(index)"
                @mouseleave="onLeave"
                @click="onClickBullet"
                v-for="(bullet, index) in bullets"
                :key="index"
              >
                <span class="emoji">{{ bullet.emoji }}</span> {{ bullet.text }}
              </div>
            </div>
          </div>
          <!-- Descriptive Texts -->
          <div class="hero-description">
            <h3>Results - soon to be published</h3>
            <p>
              The results of ArtVista’s Artwork searching models will be published soon once the research is done on the models.
            </p>
          </div>
        </div>
      </div>
      <div class="hero-right">
        <ApiSearch />
      </div>
    </div>
  </section>
</template>

<script>
import ApiSearch from './ApiSearch.vue';

export default {
  name: "HeroApi",
  components: {
    ApiSearch,
  },
  data() {
    return {
      bullets: [
        { emoji: "🤖", text: "At ArtVista, we bring advanced computer vision models to our users in the simplest way possible." },
        { emoji: "💻", text: "The Image Search API is a perfect example of our commitment to accessibility and functionality." },
        { emoji: "🎨", text: "Even though our focus is on art, our models go beyond just art, catering to diverse applications." },
        { emoji: "🚀", text: "Interested in integrating computer vision into your business? We are the Experts :)" },
        { emoji: "🤝", text: "Reach out to us to discuss how ArtVista can tailor solutions to meet your specific needs." },
      ],
      currentActiveIndex: 0, // Initialize to the first bullet
      cycleInterval: null,
      isHovered: false,
    };
  },
  methods: {
    startCycling() {
      if (!this.cycleInterval) { // Prevent multiple intervals
        this.cycleInterval = setInterval(() => {
          if (!this.isHovered) {
            this.currentActiveIndex = (this.currentActiveIndex + 1) % this.bullets.length;
          }
        }, 3500); // 3.5 seconds for readability
      }
    },
    stopCycling() {
      if (this.cycleInterval) {
        clearInterval(this.cycleInterval);
        this.cycleInterval = null;
      }
    },
    onHover(index) {
      this.isHovered = true;
      this.currentActiveIndex = index;
      this.stopCycling();
    },
    onLeave() {
      this.isHovered = false;
      // Resume cycling after a short delay to prevent immediate switch
      setTimeout(() => {
        if (!this.cycleInterval) {
          this.startCycling();
        }
      }, 1000); // 1 second delay
    },
    onClickBullet() {
      this.$router.push('/contact');
    },
  },
  mounted() {
    this.startCycling();
  },
  beforeUnmount() {
    this.stopCycling();
  },
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 30vh;
  background: transparent;
  color: #fff;
  text-align: left; /* Changed from center to left */
  position: relative;
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 50px;
}

.hero-container {
  display: flex;
  flex-direction: row; /* Keep row direction for desktop */
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.hero-left {
  flex: 1;
  padding-right: 20px;
}

.hero-right {
  flex: 1;
  padding-left: 20px;
}

.hero-content {
  max-width: 800px;
  padding: 20px;
}

.hero-title {
  font-size: 1.7rem;
  font-weight: 400;
  margin: 0;
  color: #ffffff;
}

.hero-subtitle {
  font-size: 3rem;
  font-weight: 600;
  margin: 10px 0;
  color: #ffffff;
  position: relative;
  text-shadow:
    0 0 20px rgba(29, 136, 240, 0.7),
    0 0 50px rgba(29, 136, 240, 0.5),
    0 0 80px rgba(29, 136, 240, 0.3);
  animation: shadowColorChange 5s infinite alternate ease-in-out;
}

@keyframes shadowColorChange {
  0% {
    text-shadow:
      0 0 20px rgba(29, 136, 240, 0.7),
      0 0 50px rgba(29, 136, 240, 0.5),
      0 0 80px rgba(29, 136, 240, 0.3);
  }
  100% {
    text-shadow:
      0 0 20px rgba(191, 3, 176, 0.7),
      0 0 50px rgba(191, 3, 176, 0.5),
      0 0 80px rgba(191, 3, 176, 0.3);
  }
}

.hero-description {
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  margin-top: 50px;
  font-style: italic;
}

.hero-description h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.hero-description p {
  font-size: 1rem;
  margin-bottom: 20px;
  padding-left: 0; /* Removed padding-left to eliminate left-side spacing */
}

/* Dedicated Container for Bullet Points */
.bullets-container {
  min-height: 200px; /* Adjust this value as needed */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: flex-start; /* Align items at the start vertically */
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0; /* Optional: Add vertical padding for spacing */
}

/* Updated Styles for Bullet Points */
.hero-bullets {
  display: flex;
  flex-direction: column; /* Single-column layout */
  gap: 20px; /* Space between bullets */
  padding-left: 0;
  margin-top: 0; /* Remove top margin as it's handled by bullets-container */
  width: 100%;
  max-width: 800px; /* Optional: Limit the maximum width for better readability */
  align-items: center; /* Center bullets horizontally */
}

.hero-bullet {
  position: relative; /* For pseudo-element positioning */
  display: flex;
  align-items: flex-start;
  font-size: 1rem;
  font-weight: 300;
  color: #dddddd;
  padding: 15px; /* Unified padding */
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease; /* Removed background transition */
  width: 100%; /* Make bullets take full width of the container */
  max-width: 600px; /* Optional: Limit bullet width for better readability */
  box-sizing: border-box;
  overflow: hidden; /* Ensure pseudo-element doesn't overflow */
  cursor: pointer; /* Indicate interactivity */
}

.hero-bullet::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.5s ease; /* Smooth transition for opacity */
  z-index: -1; /* Place the gradient behind the content */
}

.hero-bullet:hover::before,
.hero-bullet.active::before {
  opacity: 1; /* Fade in the gradient */
  animation: gradientAnimation 5s linear infinite; /* Start color rotation */
}

.hero-bullet:hover,
.hero-bullet.active {
  transform: scale(1.05); /* Slightly enlarge the bullet container */
}

.emoji {
  font-size: 1.5rem;
  margin-right: 10px;
  flex-shrink: 0;
}

/* Gradient Animation Keyframes */
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

/* Responsive Adjustments */

/* Tablets and Smaller Laptops */
@media (max-width: 1024px) {
  .hero-section {
    padding-top: 15px;
    padding-bottom: 40px;
    text-align: center; /* Center text in tablet view */
    align-items: center; /* Center items vertically */
  }

  .hero-container {
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center items horizontally */
    padding: 0 10px; /* Add horizontal padding for better spacing */
  }

  .hero-left,
  .hero-right {
    padding: 0;
    width: 100%; /* Ensure full width */
  }

  .hero-content {
    max-width: 100%; /* Allow content to take full width */
    padding: 15px;
    text-align: center; /* Center text */
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 3rem;
  }

  .bullets-container {
    padding-left: 0;
    gap: 15px;
    align-items: center; /* Center items vertically */
  }

  .hero-bullets {
    max-width: 700px; /* Optional: Adjust as needed */
    align-items: center; /* Ensure bullets are centered */
  }

  .hero-bullet {
    font-size: 1rem;
    padding: 10px;
    max-width: 100%; /* Allow bullets to expand fully on smaller screens */
  }

  .hero-description h3 {
    font-size: 1.1rem;
  }

  .hero-description p {
    font-size: 1rem;
  }
}

/* Style for the mobile-only message */
.mobile-only-message {
  display: none; /* Hidden by default */
  font-size: 0.9rem;
  color: #ffffff;
  margin-top: 10px;
}

/* Mobile Devices */
@media (max-width: 768px) {
  .hero-section {
    align-items: center; /* Center items vertically */
    text-align: center; /* Center text */
    padding-top: 10px;
    padding-bottom: 30px;
  }

  .hero-container {
    flex-direction: column; /* Ensure vertical stacking */
    align-items: center; /* Center items horizontally */
    padding: 0 10px; /* Add horizontal padding for better spacing */
  }

  .hero-content {
    max-width: 100%; /* Allow content to take full width */
    padding: 10px;
    text-align: center; /* Center text */
  }

  /* Display the mobile-only message */
  .mobile-only-message {
    display: block; /* Visible on mobile */
    text-align: center; /* Center the text for better aesthetics */
  }

  .hero-title {
    font-size: 1.5rem; /* Adjust font size for better mobile readability */
    margin-bottom: 5px;
  }

  .hero-subtitle {
    font-size: 2.5rem; /* Adjust font size for mobile */
  }

  .hero-description h3 {
    font-size: 1rem;
  }

  .hero-description p {
    font-size: 0.9rem;
  }

  .bullets-container {
    padding: 10px 0;
    min-height: auto; /* Remove fixed height */
    gap: 15px;
    align-items: center; /* Center items vertically */
  }

  .hero-bullets {
    align-items: center; /* Ensure bullets are centered */
    max-width: 100%;
  }

  .hero-bullet {
    font-size: 0.9rem;
    padding: 8px;
    max-width: 100%; /* Allow bullets to expand fully on smaller screens */
  }

  .emoji {
    font-size: 1.2rem;
    margin-right: 8px;
  }
}

/* Additional Mobile Optimizations */
@media (max-width: 480px) {
  .hero-title {
    font-size: 1.3rem;
  }

  .hero-subtitle {
    font-size: 2rem;
  }

  .hero-bullet {
    font-size: 0.8rem;
    padding: 6px;
  }

  .emoji {
    font-size: 1rem;
    margin-right: 6px;
  }

  .hero-description {
    margin-top: 15px;
  }
}
</style>
