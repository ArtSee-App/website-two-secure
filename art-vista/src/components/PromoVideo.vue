<template>
  <div class="promo-video-container">
    <div class="promo-content">
      <p>SOON TO BE A PROMO VIDEO HERE</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromoVideo",
};
</script>

<style scoped>
/* Container for the promo video with animated stroke (border) */
.promo-video-container {
  display: flex;
  justify-content: center;
  align-items: center;

  /* Stroke thickness */
  padding: 3px;

  border-radius: 12px;

  /* Gradient border with animated colors */
  background: linear-gradient(
    45deg,
    #03C1FD,
    #B902A7,
    #00fff2,
    #b90239
  );
  background-size: 400% 400%;
  animation: gradientAnimation 10s linear infinite;

  /* Maintain 4:3 aspect ratio */
  aspect-ratio: 4 / 3;

  /* Responsive width */
  width: 100%;
  max-width: 800px;

  box-sizing: border-box;
}

/* Content box for the promo video */
.promo-content {
  display: flex;
  justify-content: center;
  align-items: center;

  /* Background color of the content box */
  background-color: #1e1e1e;

  /* Set the content size */
  width: 100%;
  height: 100%;

  border-radius: 10px;

  /* Text color inside the content */
  color: #888;

  /* Maintain exact dimensions */
  padding: 0;

  /* Shadow effect around the content */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

/* Styling for the placeholder text */
.promo-content p {
  font-size: 1.2rem;
}

/* Keyframes for the animated gradient border */
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

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .promo-video-container {
    border-radius: 0; /* Remove border radius for straight stroke */
    height: auto; /* Allow height to adjust based on content */
    padding: 0; /* Remove padding */
    /* Background remains as gradient for consistency */
  }

  .promo-content {
    height: auto; /* Allow height to adjust */
    border-radius: 0; /* Remove border radius from content */
    box-shadow: none; /* Remove shadow for a cleaner look */
  }

  /* Adjust text size and spacing for better readability on small screens */
  .promo-content p {
    font-size: 1rem; /* Smaller font size */
    text-align: center; /* Center align text */
    padding: 10px; /* Add padding for better spacing */
  }
}
</style>
