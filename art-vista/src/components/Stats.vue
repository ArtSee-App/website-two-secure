<template>
  <section class="stats">
    <div
      class="stat"
      v-for="(stat, index) in stats"
      :key="index"
      :class="{ 'stat-app': stat.label === 'App' }"
    >
      <!-- Applying the highlight class to the value text -->
      <h2 class="highlight">{{ stat.value }}</h2>
      <p>{{ stat.label }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Stats',
  data() {
    return {
      stats: [
        { value: '2.000.000+', label: 'Artworks' },
        { value: '10.000+', label: 'Artists' },
        { value: 'One', label: 'App' }
      ]
    }
  }
}
</script>

<style scoped>
/* Container for the stats section */
.stats {
  display: flex;
  justify-content: space-around; /* Space around each stat */
  margin: 50px 0;
  text-align: center; /* Center align text */
  flex-wrap: wrap; /* Allow stats to wrap to the next line if necessary */
}

/* Individual stat item */
.stat {
  flex: 1; /* Each stat takes equal width */
  min-width: 200px; /* Ensure a minimum width for better responsiveness */
  margin: 10px 0; /* Vertical margin for spacing */
}

/* Styling for the value text with animated gradient effect */
.stat h2 {
  font-size: 2em; /* Adjust this value to change the font size */
  font-weight: 900; /* Bold text */
  margin: 0; /* Remove default margin */
}

/* Animated gradient text for the stat value */
.highlight {
  /* Gradient background with animated colors */
  background: linear-gradient(45deg, #B902A7, #03C1FD);
  background-size: 400% 400%;
  -webkit-background-clip: text; /* Clipping the gradient to text */
  background-clip: text; /* Standard property */
  -webkit-text-fill-color: transparent; /* Filling the text with transparent to show the gradient */
  animation: gradientAnimation 10s linear infinite; /* Adjust duration for speed */
  font-weight: 900; /* Bold weight for the highlighted text */
}

/* Keyframes for the animated gradient */
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

/* Styling for the label text */
.stat p {
  font-size: 1.5em; /* Adjust this value to change the font size of the label */
  color: #f1f1f1; /* Brighter white color */
  font-weight: 600; /* Bolder weight for the label text */
  margin-top: 5px; /* Space above the label */
}

/* *** Updated Media Queries for Responsive Design *** */

/* Mobile Phones */
@media screen and (max-width: 480px) {
  .stat h2 {
    font-size: 1.5em; /* Further reduce font size for mobile phones */
  }

  .stat p {
    font-size: 1.2em; /* Further reduce font size for mobile phone labels */
  }

  .stats {
    margin: 80px 0 40px 0; /* Increased top margin for mobile phones */
    justify-content: center; /* Center the stats */
    flex-direction: row; /* Ensure row direction */
    flex-wrap: wrap; /* Allow wrapping */
  }

  /* Reset default .stat styles */
  .stat {
    flex: 0 0 45%; /* Set to 45% for consistent width */
    margin: 10px 2.5%; /* Horizontal margin for spacing */
  }

  /* Hide the third stat ("App") on mobile phones */
  .stat-app {
    display: none;
  }
}

/* Optional: Enhance responsiveness for medium-sized screens (Tablets) */
@media screen and (min-width: 481px) and (max-width: 767px) {
  .stat h2 {
    font-size: 1.5em; /* Slightly reduce font size for tablets */
  }

  .stat p {
    font-size: 1.2em; /* Slightly reduce font size for tablet labels */
  }

  .stats {
    margin: 30px 0; /* Adjust vertical margin for tablets */
    justify-content: space-around; /* Space around each stat */
  }

  .stat {
    flex: 0 0 45%; /* Each stat takes up 45% width */
    margin: 10px 2.5%; /* Add horizontal margin for spacing */
  }

  /* Ensure the third stat ("App") is visible on tablets */
  .stat-app {
    display: block;
  }
}
</style>
