<template>
  <section class="stats">
    <div
      class="stat-container"
      v-for="(stat, index) in stats"
      :key="index"
      :class="{ 'stat-app': stat.label === 'App' }"
    >
      <div class="stat-content">
        <h2 class="highlight">{{ stat.value }}</h2>
        <p>{{ stat.label }}</p>
      </div>
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
  justify-content: space-around;
  margin: 30px 0;
  text-align: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 20px;
}

/* Individual stat container */
.stat-container {
  flex: 1;
  min-width: 200px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 20px 15px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}

.stat-container:hover {
  transform: translateY(-3px);
}

/* Content wrapper for each stat */
.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

/* Styling for the value text with animated gradient effect */
.stat-content h2 {
  font-size: 2em;
  font-weight: 900;
  margin: 0;
}

/* Animated gradient text for the stat value */
.highlight {
  background: linear-gradient(45deg, #B902A7, #03C1FD);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 10s linear infinite;
  font-weight: 900;
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
.stat-content p {
  font-size: 1.2em;
  color: #f1f1f1;
  font-weight: 600;
  margin: 0;
}

/* Mobile Phones */
@media screen and (max-width: 480px) {
  .stats {
    margin: 30px 0;
    gap: 10px;
  }

  .stat-container {
    min-width: 100%;
    padding: 15px 10px;
    min-height: 100px;
  }

  .stat-content h2 {
    font-size: 1.8em;
  }

  .stat-content p {
    font-size: 1.1em;
  }

  .stat-app {
    display: none;
  }
}

/* Tablets */
@media screen and (min-width: 481px) and (max-width: 767px) {
  .stats {
    margin: 25px 0;
    gap: 10px;
  }

  .stat-container {
    min-width: calc(50% - 10px);
    padding: 15px 10px;
    min-height: 100px;
  }

  .stat-content h2 {
    font-size: 1.8em;
  }

  .stat-content p {
    font-size: 1.1em;
  }

  .stat-app {
    display: block;
  }
}
</style>
