<!-- Header.vue -->
<template>
  <header :class="{ scrolled }">
    <nav>
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <img src="@/assets/logo.png" alt="ArtVista Logo" class="logo" />
          <span class="logo-text">ArtVista</span>
        </router-link>
      </div>
      <!-- Desktop Navigation Links -->
      <ul class="nav-links">
        <li><router-link to="/api">API</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
      <!-- Sign In Button -->
      <div class="auth-buttons">
        <a href="https://portal.artvista.app" target="_blank" rel="noopener noreferrer" class="sign-in-button">Log in</a>
      </div>
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
    <!-- Sidebar with Transition -->
    <transition name="slide">
      <div v-if="sidebarOpen" class="sidebar">
        <ul class="sidebar-links">
          <li><router-link to="/api" @click="closeSidebar">API</router-link></li>
          <li><router-link to="/about" @click="closeSidebar">About</router-link></li>
          <li><router-link to="/contact" @click="closeSidebar">Contact</router-link></li>
          <li><a href="https://portal.artvista.app" target="_blank" rel="noopener noreferrer" @click="closeSidebar">Log in</a></li>
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
export default {
  name: 'Header',
  data() {
    return {
      scrolled: false,
      sidebarOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
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
    handleKeyDown(event) {
      if (event.key === 'Escape' && this.sidebarOpen) {
        this.closeSidebar();
      }
    }
  }
};
</script>

<style scoped>
/* Import the Judson font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Judson&display=swap');

/* Header styling */
header {
  position: fixed;
  top: 20px; /* Initial space from the top for desktop */
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1400px;
  padding: 10px 5px;
  background: transparent;
  border-radius: 15px;
  z-index: 1000;
  transition: all 0.3s ease;
  overflow: hidden; /* Ensure pseudo-element is contained */
}

header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(185, 2, 167, 0.7), rgba(3, 193, 253, 0.7));
  background-size: 400% 400%;
  animation: gradientAnimation 10s linear infinite;
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
  backdrop-filter: blur(0px);
}

header.scrolled::before {
  opacity: 1;
  backdrop-filter: blur(20px);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5px;
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

.logo {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  color: white;
  font-size: 30px;
  font-weight: 350;
  font-family: 'Judson', serif; /* Apply the Judson font here */
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
  margin-right: 0;
}

.sign-in-button {
  color: #010820;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.sign-in-button:hover {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-links li {
  margin-left: 20px;
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

/* Header styling when scrolled */
header.scrolled {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

header.scrolled::before {
  background: linear-gradient(45deg, rgba(185, 2, 167, 0.7), rgba(3, 193, 253, 0.7));
  background-size: 400% 400%;
  animation: gradientAnimation 10s linear infinite;
  opacity: 1;
  backdrop-filter: blur(20px);
}

/* Gradient animation keyframes */
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

  header {
    left: 0;
    transform: none;
    width: 100%;
    border-radius: 0;
    top: 0; /* Remove the 20px space from the top */
    padding: 10px 20px; /* Adjust other padding as needed */
  }

  nav {
    padding: 10px 20px;
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

@media screen and (max-width: 480px) {
  .app-design {
    padding-bottom: 50px; /* Further reduce bottom padding */
    margin: 20px 0; /* Further reduce vertical margins */
    overflow: visible; /* Allow child elements to overflow */
  }

  .app-description {
    font-size: 16px; /* Further reduce font size */
  }

  .iphone-wrapper {
    width: 80vw; /* Further reduce iPhone wrapper width */
    aspect-ratio: 1 / 1.3; /* Maintain a 1:1.3 width-to-height ratio */
    margin-top: 15px; /* Adjust space between text and iPhone */
    border-radius: 20px; /* Decrease border radius for smaller screens */
    overflow: visible; /* Allow blurry background to extend beyond borders */
  }

  .iphone {
    border-radius: calc(20px - 5px); /* 15px */
  }

  .background-image {
    width: 150px !important; /* Significantly reduce background image size */
    filter: blur(0px) !important; /* Remove blur effect */
  }

  /* Remove the blurred pseudo-element */
  .iphone-wrapper::before {
    display: none; /* Hide the pseudo-element to eliminate blur */
  }

  /* Optional: Hide additional background images if necessary */
  .background-image:nth-child(2),
  .background-image:nth-child(4) {
    display: none;
  }
}
</style>
