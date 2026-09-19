<template>
  <!-- Three full-screen "scenes"; the wheel steps through them, then the page continues -->
  <HorizontalScroll mode="fade">
    <StatPanel :index="0" :value="2000000" suffix="+" label="artworks" :artworks="artworks" />
    <StatPanel :index="1" :value="10000" suffix="+" label="artists" :artworks="artists" />
    <StatPanel :index="2" text="One app" caption="All you need is bundled in ArtVista for your next museum trip." theme="light">
      <template #media>
        <!-- 3D iPhone renders from the Brand Media Figma file, rising from the bottom -->
        <div class="phones">
          <!-- soft purple slabs behind the phones, like the brand banners -->
          <span class="phones__slab phones__slab--left" aria-hidden="true"></span>
          <span class="phones__slab phones__slab--right" aria-hidden="true"></span>
          <div class="phone phone--left" :style="{ '--mask': `url(${phoneLeft})` }">
            <span class="phone__glow" aria-hidden="true"></span>
            <img :src="phoneLeft" alt="" width="1601" height="2646" loading="lazy" decoding="async" />
          </div>
          <div class="phone phone--right" :style="{ '--mask': `url(${phoneRight})` }">
            <span class="phone__glow" aria-hidden="true"></span>
            <img :src="phoneRight" alt="" width="1645" height="2466" loading="lazy" decoding="async" />
          </div>
        </div>
      </template>
    </StatPanel>
  </HorizontalScroll>
</template>

<script setup>
import HorizontalScroll from '@/components/HorizontalScroll.vue';
import StatPanel from '@/components/StatPanel.vue';
import phoneLeft from '@/assets/phone_left.webp';
import phoneRight from '@/assets/phone_right.webp';

// Small WebP thumbnails scattered behind the figures.
// Drop more files into these folders and they are picked up automatically:
//   src/assets/artworks/  → paintings for the "artworks" scene
//   src/assets/artists/   → artist photos for the "artists" scene
const requireArtworks = require.context('@/assets/artworks', false, /\.(webp|jpe?g|png)$/i);
const requireArtists = require.context('@/assets/artists', false, /\.(webp|jpe?g|png)$/i);
const artworks = requireArtworks.keys().map(key => requireArtworks(key));
const artists = requireArtists.keys().map(key => requireArtists(key));
</script>

<style scoped>
/* Third scene: phones on either side of the text — left one drops in from
   the top, right one rises from the bottom. */
.phones {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Two big rounded rectangles, rotated 45°, protruding in from the left and right
   edges — the left one runs upward, the right one runs downward (not symmetric). */
.phones__slab {
  position: absolute;
  /* Rotated 45°, so the SHORT side is what pushes the left one's tip upward and the
     right one's tip downward; the long side is what pokes in toward the text. */
  width: min(72vh, 55vw);  /* vh on wide screens; capped by vw so portrait tablets don't drown in purple */
  height: min(80vh, 62vw);
  border-radius: 80px;
  background: linear-gradient(160deg, #7b3fe4 0%, #b02fc7 55%, #d43fb8 100%);
  opacity: 0;
  transition: transform 1.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}

/* positioned by their centre: left one sits low, right one sits high */
.phones__slab--left {
  left: 0;
  top: 46%;
  transform: translate(-160%, -50%) rotate(45deg); /* parked outside, slides in */
}

.phones__slab--right {
  left: 100%;
  top: 54%;
  transform: translate(60%, -50%) rotate(45deg);
  transition-delay: 0.1s;
}

:deep(.is-active) .phones__slab {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(45deg);
}

/* Phone = soft white halo behind + the render on top */
.phone {
  position: absolute;
  top: 50%;
  height: 58%;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
  opacity: 0;
}

.phone img {
  position: relative;
  display: block;
  height: 100%;
  width: auto;
  filter: drop-shadow(0 28px 34px rgba(30, 10, 60, 0.38)) drop-shadow(0 4px 10px rgba(30, 10, 60, 0.25));
}

/* White, cut to the phone's exact silhouette: the render itself is used as an alpha mask */
.phone__glow::before {
  position: absolute;
  inset: 0;
  background: #fff;
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

/* Soft white halo: same silhouette, bigger and heavily blurred. The blur lives on
   the wrapper (not the masked pseudo) so it can spill outside the silhouette. */
.phone__glow {
  position: absolute;
  inset: 0;
  transform: scale(1.12);
  filter: blur(28px);
  opacity: 0.95;
}

.phone__glow::before {
  content: '';
}

.phone--left {
  left: 6%;
  transform: translateY(-140%) rotate(-4deg); /* parked above */
}

.phone--right {
  right: 6%;
  transform: translateY(40%) rotate(4deg);    /* parked below */
  transition-delay: 0.1s;
}

:deep(.is-active) .phone {
  opacity: 1;
  transform: translateY(-50%) rotate(0deg);
}

/* Tablet: size the phones by width so they never squash, and keep them clear of the text */
@media screen and (max-width: 1100px) {
  .phone {
    width: 20%;
    height: auto;
  }

  .phone img {
    width: 100%;
    height: auto;
  }

  .phone--left { left: 3%; }
  .phone--right { right: 3%; }
}

@media screen and (max-width: 768px) {
  /* Two renders side by side under the text; no slabs, no drop-in animation */
  .phones {
    position: relative;
    inset: auto;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 18px;
    margin-top: 28px;
    padding: 0 8px;
  }

  .phone,
  :deep(.is-active) .phone {
    position: relative; /* keeps the halo anchored to the phone */
    top: auto;
    height: auto;
    width: 44%;
    opacity: 1;
    transform: none;
    transition: none;
  }

  .phone img {
    width: 100%;
    height: auto;
    max-width: none;
  }

  .phones__slab {
    display: none;
  }
}
</style>
