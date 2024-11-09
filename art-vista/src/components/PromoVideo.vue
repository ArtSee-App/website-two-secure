<template>
  <div class="promo-video-container">
    <div
      class="promo-content"
      :style="{
        '--padding-top': paddingTop,
        '--padding-right': paddingRight,
        '--padding-bottom': paddingBottom,
        '--padding-left': paddingLeft,
      }"
    >
      <img :src="promoGif" alt="Promo Video" class="promo-img" />
    </div>
  </div>
</template>

<script>
import promoGif from '@/assets/promo.gif';

export default {
  name: 'PromoVideo',
  props: {
    paddingTop: {
      type: String,
      default: '8px',
    },
    paddingRight: {
      type: String,
      default: '8px',
    },
    paddingBottom: {
      type: String,
      default: '8px',
    },
    paddingLeft: {
      type: String,
      default: '8px',
    },
  },
  data() {
    return {
      promoGif,
    };
  },
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
  background: linear-gradient(45deg, #03c1fd, #b902a7, #00fff2, #b90239);
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Background color of the content box */
  background-color: #010820;

  /* Set the content size */
  width: 100%;
  height: 100%;

  border-radius: 8px;

  /* Padding controlled via CSS variables */
  padding-top: var(--padding-top);
  padding-right: var(--padding-right);
  padding-bottom: var(--padding-bottom);
  padding-left: var(--padding-left);

  box-sizing: border-box;

  /* Shadow effect around the content */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

  /* Prevent content from overflowing the border radius */
  overflow: hidden;
}

/* Styling for the promo GIF */
.promo-img {
  position: absolute;
  top: var(--padding-top);
  left: var(--padding-left);
  width: calc(100% - var(--padding-left) - var(--padding-right));
  height: calc(100% - var(--padding-top) - var(--padding-bottom));
  object-fit: cover;
  border-radius: inherit;
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
  }

  .promo-content {
    height: auto; /* Allow height to adjust */
    border-radius: 0; /* Remove border radius from content */
    box-shadow: none; /* Remove shadow for a cleaner look */
  }

  /* Adjust the promo GIF for better readability on small screens */
  .promo-img {
    width: 100%;
    height: auto;
    position: static;
    top: 0;
    left: 0;
  }
}
</style>
