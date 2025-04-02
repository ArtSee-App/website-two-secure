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
/* Container for the promo video */
.promo-video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  aspect-ratio: 4 / 3;
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  overflow: hidden;
}

/* Content box for the promo video */
.promo-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #010820;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding-top: var(--padding-top);
  padding-right: var(--padding-right);
  padding-bottom: var(--padding-bottom);
  padding-left: var(--padding-left);
  box-sizing: border-box;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .promo-video-container {
    border-radius: 0;
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16/9;
  }

  .promo-content {
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
  }

  /* Adjust the promo GIF for better readability on small screens */
  .promo-img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}
</style>
