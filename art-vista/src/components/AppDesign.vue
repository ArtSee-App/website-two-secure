<template>
  <section class="app-design">
    <!-- Background Images -->
    <div class="background-images">
      <img
        v-for="(image, index) in backgroundImages"
        :key="index"
        :src="image.src"
        class="background-image"
        :style="{
          top: image.top,
          left: image.left,
          width: image.width,
          '--rotation': image.rotation + 'deg',
          filter: 'blur(' + image.blur + 'px)',
          opacity: image.opacity,
          borderRadius: image.borderRadius,
        }"
        alt="Background Art"
      />
    </div>

    <!-- App Description Text -->
    <div class="app-description">
      <p>
        ArtVista is the most advanced art app, dedicated to bringing art to your fingertips -
        while keeping the world of art interesting and fun for you 🥳🥳🥳
      </p>
    </div>

    <!-- iPhone Wrapper -->
    <div class="iphone-wrapper">
      <div class="iphone">
        <!-- iPhone Image -->
        <img
          :src="currentIphoneImage"
          alt="iPhone Design"
          class="iphone-image"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppDesign',
  data() {
    return {
      backgroundImages: [
        {
          src: require('@/assets/background_paintings/almond_blossom.jpg'),
          top: '10%',
          left: '75%',
          width: '300px',
          rotation: 15,
          blur: 2,
          opacity: 1,
          borderRadius: '10px',
        },
        {
          src: require('@/assets/background_paintings/gun_salesman.jpg'),
          top: '50%',
          left: '80%',
          width: '250px',
          rotation: 10,
          blur: 2,
          opacity: 1,
          borderRadius: '15px',
        },
        {
          src: require('@/assets/background_paintings/wanderer.jpg'),
          top: '20%',
          left: '0%',
          width: '150px',
          rotation: 10,
          blur: 2.5,
          opacity: 1,
          borderRadius: '25px',
        },
        {
          src: require('@/assets/background_paintings/two_crabs.jpg'),
          top: '0%',
          left: '20%',
          width: '300px',
          rotation: -10,
          blur: 2,
          opacity: 1,
          borderRadius: '10px',
        },
        {
          src: require('@/assets/background_paintings/two_cut_sunflowers.jpg'),
          top: '60%',
          left: '15%',
          width: '350px',
          rotation: -15,
          blur: 2,
          opacity: 1,
          borderRadius: '35px',
        },
      ],
      // List of iPhone images to cycle through
      iphoneImages: [
        require('@/assets/iphone_images/1.png'),
        require('@/assets/iphone_images/2.png'),
        require('@/assets/iphone_images/3.png'),
      ],
      currentImageIndex: 0, // Tracks the current image index
      imageInterval: null, // Holds the interval ID
    };
  },
  computed: {
    // Computed property to get the current image
    currentIphoneImage() {
      return this.iphoneImages[this.currentImageIndex];
    },
  },
  mounted() {
    // Set up the interval to change images every second (1000 ms)
    this.imageInterval = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.iphoneImages.length;
    }, 1000);
  },
  beforeUnmount() {
    // Clear the interval when the component is about to be unmounted to prevent memory leaks
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
    }
  },
};
</script>

<style scoped>
/* App Design Section */
.app-design {
  position: relative; /* Establish positioning context for absolute elements */
  display: flex;
  flex-direction: row; /* Horizontal layout by default */
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  text-align: left;
  padding-bottom: 150px; /* Added padding to create space at the bottom */
}

/* Background Images Container */
.background-images {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Place behind other content */
}

/* Background Image Styles */
.background-image {
  position: absolute;
  /* Opacity and border-radius are now set inline via :style binding */
  transition: transform 0.3s ease-in-out;
  transform: rotate(var(--rotation));
}

/* Different floating patterns for each image */
.background-image:nth-child(1) { animation: float1 8s ease-in-out infinite; }
.background-image:nth-child(2) { animation: float2 9.5s ease-in-out infinite; }
.background-image:nth-child(3) { animation: float3 7.5s ease-in-out infinite; }
.background-image:nth-child(4) { animation: float4 8.5s ease-in-out infinite; }
.background-image:nth-child(5) { animation: float5 7.8s ease-in-out infinite; }

@keyframes float1 {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  20% { transform: translateY(-8px) rotate(var(--rotation)); }
  40% { transform: translateY(4px) rotate(var(--rotation)); }
  60% { transform: translateY(-6px) rotate(var(--rotation)); }
  80% { transform: translateY(8px) rotate(var(--rotation)); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  25% { transform: translateY(6px) rotate(var(--rotation)); }
  50% { transform: translateY(-4px) rotate(var(--rotation)); }
  75% { transform: translateY(8px) rotate(var(--rotation)); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  30% { transform: translateY(-5px) rotate(var(--rotation)); }
  60% { transform: translateY(5px) rotate(var(--rotation)); }
  90% { transform: translateY(-3px) rotate(var(--rotation)); }
}

@keyframes float4 {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  15% { transform: translateY(7px) rotate(var(--rotation)); }
  45% { transform: translateY(-5px) rotate(var(--rotation)); }
  75% { transform: translateY(3px) rotate(var(--rotation)); }
}

@keyframes float5 {
  0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
  35% { transform: translateY(-6px) rotate(var(--rotation)); }
  65% { transform: translateY(4px) rotate(var(--rotation)); }
  85% { transform: translateY(-7px) rotate(var(--rotation)); }
}

/* App Description Text */
.app-description {
  max-width: 300px;
  margin-right: 100px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.3;
  text-align: left;
  z-index: 1; /* Place above background images */
}

/* iPhone Wrapper with Animated Gradient Border */
.iphone-wrapper {
  position: relative;
  width: 300px;
  height: 650px;
  border-radius: 40px;
  padding: 3px;
  background: linear-gradient(90deg, #1D88F0, #BF03B0, #e45f06);
  background-size: 600% 600%;
  animation: gradientAnimation 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1; /* Place above background images */
}

/* Pseudo-element for Animated Shadow */
.iphone-wrapper::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 55px;
  background: inherit;
  background-size: inherit;
  animation: inherit;
  filter: blur(30px);
  z-index: -1;
}

/* iPhone Container */
.iphone {
  width: 100%;
  height: 100%;
  border-radius: calc(40px - 5px);
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

/* iPhone Image */
.iphone-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

/* Keyframes for Gradient Animation */
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

/* *** New Media Queries for Responsive Design *** */

/* *** New Media Queries for Responsive Design *** */

/* Tablet Devices (max-width: 1024px) */
@media screen and (max-width: 1024px) {
  .app-design {
    padding-bottom: 100px; /* Reduce bottom padding */
  }

  .app-description {
    max-width: 250px; /* Slightly reduce text container width */
    margin-right: 50px; /* Reduce right margin */
    font-size: 20px; /* Slightly smaller font size */
  }

  .iphone-wrapper {
    width: 250px; /* Reduce iPhone wrapper width */
    height: 550px; /* Reduce iPhone wrapper height */
  }

  .background-image {
    width: 250px !important; /* Scale down background images slightly */
  }
}

/* Mobile Devices (max-width: 768px) */
/* This is the breakpoint when the burger icon activates */
/* Mobile Devices (max-width: 768px) */
/* This is the breakpoint when the burger icon activates */
@media screen and (max-width: 768px) {
  .app-design {
    flex-direction: column; /* Stack elements vertically */
    padding-bottom: 80px; /* Adjust bottom padding */
    text-align: center; /* Center align text */
    margin: 30px 0; /* Reduce vertical margins */
  }

  .app-description {
    max-width: 90%; /* Allow text to take up more width */
    margin: 0 0 20px 0; /* Remove right margin and add bottom margin */
    font-size: 18px; /* Further reduce font size */
  }

  .iphone-wrapper {
    width: 220px; /* Adjust iPhone wrapper width */
    height: 500px; /* Adjust iPhone wrapper height */
    margin-top: 20px; /* Add space between text and iPhone */
    /* Adjust border radius for tablet screens */
    border-radius: 25px; /* Previously 25px, no change needed here */
    overflow: visible; /* Allow blurry background to extend beyond borders */
  }

  .iphone {
    border-radius: calc(25px - 5px); /* 20px */
  }

  .background-image {
    width: 200px !important; /* Scale down background images */
  }

  /* Optional: Hide some background images to reduce clutter */
  .background-image:nth-child(1),
  .background-image:nth-child(2),
  .background-image:nth-child(3),
  .background-image:nth-child(4),
  .background-image:nth-child(5),
  .background-image:nth-child(6) {
    display: none;
  }
}

/* Mobile Phones (max-width: 480px) */
@media screen and (max-width: 480px) {
  .app-design {
    padding-bottom: 50px; /* Further reduce bottom padding */
    margin: 0px 0; /* Further reduce vertical margins */
    overflow: visible; /* Allow child elements to overflow */
  }

  .app-description {
    font-size: 16px; /* Further reduce font size */
  }

  .iphone-wrapper {
    width: 70vw; /* Further reduce iPhone wrapper width */
    height: calc(2.2 * 70vw); /* Set height to 1.3 times the width */
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
