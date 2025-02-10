<!-- src/views/About.vue -->
<template>
  <div class="about-page">
    <Header />
    <main>
      <h1 class="animated-title">Who Are We? 👨‍🏭👩‍🔧</h1>
      
      <!-- Existing Bulleted Content -->
      <div class="about-bullets">
        <div
          class="about-bullet"
          v-for="(bullet, index) in aboutBullets"
          :key="index"
        >
          <span class="emoji">{{ bullet.emoji }}</span>
          <span class="text">{{ bullet.text }}</span>
        </div>
      </div>
      
      <h1 class="animated-title">Media & Press 🗞️🎬</h1>
      
      <!-- New Bulleted Content for Media & Press -->
      <div class="media-press-bullets">
        <div
          class="media-press-bullet"
          v-for="(bullet, index) in mediaPressBullets"
          :key="index"
        >
          <a :href="bullet.link" target="_blank" rel="noopener noreferrer">
            <span class="emoji">{{ bullet.emoji }}</span>
            <span class="text">{{ bullet.text }}</span>
          </a>
        </div>
      </div>
      
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'About',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      aboutBullets: [
        {
          emoji: "🎓",
          text: "Founded in 2022 in Eindhoven to merge art and technology, bridging the gap between these two worlds."
        },
        {
          emoji: "🚀",
          text: "Started in 2022 when a team member went nuts after his museum trip. Later, we thought of ArtVista for the first time."
        },
        {
          emoji: "🎡",
          text: "What started as a side one-month project to identify artworks turned into a year-long journey of development."
        },
        {
          emoji: "💬",
          text: "Talking to museums, we discovered that the challenge we set out to solve was shared by many visitors."
        },
        {
          emoji: "🔧",
          text: "After nearly a year of refining the first version, we pushed forward to build the ArtVista you see today."
        },
        {
          emoji: "🤝",
          text: "ArtVista now brings together experts from Art, Museums, Fashion, and High Tech, shaping its future."
        }
      ],
      mediaPressBullets: [
        {
          emoji: "🏆",
          text: "TU/e Contest 2024 - ASML Makers Award for ArtVista",
          link: "https://tuecontest.nl/"
        },
        {
          emoji: "🎤",
          text: "Hatch by Digital Ocean Sponsors ArtVista",
          link: "https://www.digitalocean.com/hatch"
        }
      ]
    };
  }
};
</script>

<style scoped>
.about-page {
  padding-top: 80px; /* Adjust based on your header height */
  /* Add your additional styles here if needed */
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.animated-title {
  position: relative;
  text-align: left;
  color: #ffffff;
  margin-bottom: 40px;
  font-size: 2.5rem; /* Base font size */
  cursor: pointer;
  overflow: hidden; /* Hide the pseudo-element overflow */
}

.animated-title::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
  background-size: 400% 400%;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1; /* Place the gradient behind the text */
  border-radius: 8px; /* Match the bullets' border-radius */
}

.animated-title:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
}

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

/* Existing Bulleted Content */
.about-bullets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.about-bullet {
  position: relative; /* For consistency with HeroApi bullets */
  display: flex;
  align-items: center; /* Center vertically */
  padding: 20px; /* Increased padding for better spacing */
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease, background 0.3s ease;
  cursor: pointer;
  color: #e9e9e9; /* Updated font color */
  overflow: hidden; /* Ensure pseudo-element doesn't overflow */
}

.about-bullet::before {
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
  z-index: -1; /* Place the gradient behind the content */
  border-radius: 8px; /* Match the bullet's border-radius */
}

.about-bullet:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
}

.about-bullet:hover,
.about-bullet.active {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

.emoji {
  font-size: 1.5rem; /* Base emoji size */
  margin-right: 15px; /* Increased margin for better spacing */
  flex-shrink: 0;
}

.text {
  font-size: 1rem; /* Base text size */
  font-weight: 300;
  line-height: 1.5;
}

/* New Styles for Media & Press Bullets */
.media-press-bullets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px; /* Optional: Add spacing above */
}

.media-press-bullet {
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease, background 0.3s ease;
  cursor: pointer;
  color: #e9e9e9;
  overflow: hidden;
}

.media-press-bullet a {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.media-press-bullet::before {
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
  z-index: -1; /* Place the gradient behind the content */
  border-radius: 8px; /* Match the bullet's border-radius */
}

.media-press-bullet:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
}

.media-press-bullet:hover,
.media-press-bullet.active {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

.media-press-bullet .emoji {
  font-size: 1.5rem;
  margin-right: 15px;
  flex-shrink: 0;
}

.media-press-bullet .text {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  text-decoration: underline; /* Added this line */
}

/* Responsive Adjustments */

/* Mobile Devices */
@media (max-width: 768px) {
  .animated-title {
    font-size: 1.8rem;
  }

  .about-bullets,
  .media-press-bullets {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .about-bullet,
  .media-press-bullet {
    font-size: 0.9rem;
    padding: 12px;
  }

  .emoji {
    font-size: 1.2rem;
    margin-right: 8px;
  }
}
</style>
