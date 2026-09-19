<template>
  <div class="home">
    <Header />
    <!-- Hero + second panel: scrolling first slides sideways, then continues down -->
    <HorizontalScroll>
      <Hero />
      <HeroSecondary />
    </HorizontalScroll>
    <Stats />
    <div class="page-rest">
      <!-- Own full-height screen: the typed reviews and the video cards never share the viewport -->
      <section ref="proofEl" class="proof snap-page" data-snap-page aria-label="Reviews and newsletter">
        <Reviews />
        <Newsletter />
      </section>
      <div class="snap-page" data-snap-page>
        <section class="audiences" aria-label="Who ArtVista is for">
          <div class="audiences__grid">
            <ForArtEnthusiasts />
            <ForArtists />
            <ForMuseums />
          </div>
        </section>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import HeroSecondary from '@/components/HeroSecondary.vue'
import HorizontalScroll from '@/components/HorizontalScroll.vue'
import Newsletter from '@/components/Newsletter.vue'
import Stats from '@/components/Stats.vue'
import ForArtEnthusiasts from '@/components/ForArtEnthusiasts.vue'
import ForArtists from '@/components/ForArtists.vue'
import ForMuseums from '@/components/ForMuseums.vue'
import Reviews from '@/components/Reviews.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    HeroSecondary,
    HorizontalScroll,
    Newsletter,
    Stats,
    ForArtEnthusiasts,
    ForArtists,
    ForMuseums,
    Reviews,
    Footer
  },
  data() {
    return { glowRaf: 0, glowReduced: false };
  },
  mounted() {
    this.glowReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.glowReduced) {
      this.$refs.proofEl.style.setProperty('--glow-o', '1');
      return;
    }
    window.addEventListener('scroll', this.onScrollGlow, { passive: true });
    window.addEventListener('resize', this.onScrollGlow);
    this.onScrollGlow();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScrollGlow);
    window.removeEventListener('resize', this.onScrollGlow);
    cancelAnimationFrame(this.glowRaf);
  },
  methods: {
    /**
     * Scroll-linked lights behind the reviews: brightest when the section is
     * centred in the viewport, dimming as it approaches / leaves, and drifting
     * vertically against the scroll (parallax). Written as two CSS variables
     * that only drive opacity and transform, so it never triggers layout.
     */
    onScrollGlow() {
      if (this.glowRaf) return;
      this.glowRaf = requestAnimationFrame(() => {
        this.glowRaf = 0;
        const el = this.$refs.proofEl;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 … 0 … 1: section centre one viewport below / centred / one viewport above
        const d = (rect.top + rect.height / 2 - vh / 2) / vh;
        const opacity = Math.max(0, Math.min(1, 1.15 - Math.abs(d) * 1.15));
        const shift = Math.round(d * -140); // moves up as you scroll down past it
        el.style.setProperty('--glow-o', opacity.toFixed(3));
        el.style.setProperty('--glow-y', `${shift}px`);
      });
    }
  }
}
</script>

<style scoped>
/* Fills the viewport so the video cards below only appear after scrolling past the reviews */
.proof {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 32px 24px clamp(40px, 12vh, 128px); /* bottom-heavy so the centred content sits higher */
  position: relative;
  isolation: isolate;
}

/* Two soft lights behind the section: not boxed in, they bleed past the top and bottom
   and fade to nothing at the edges. Brightness and vertical drift follow the scroll
   (see onScrollGlow). */
.proof::before {
  content: '';
  position: absolute;
  top: -18%;
  bottom: -18%;
  left: 50%;
  width: 100vw; /* spans the whole viewport, not just the 1600px page column */
  transform: translate(-50%, var(--glow-y, 0px));
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(45% 60% at 22% 78%, rgba(29, 136, 240, 0.28) 0%, rgba(29, 136, 240, 0) 70%),
    radial-gradient(45% 60% at 78% 22%, rgba(191, 3, 176, 0.24) 0%, rgba(191, 3, 176, 0) 70%);
  opacity: var(--glow-o, 0);
  will-change: opacity, transform;
  transition: opacity 0.2s linear, transform 0.2s linear; /* smooths the per-frame steps */
}

@media (prefers-reduced-motion: reduce) {
  .proof::before { transform: translateX(-50%); transition: none; }
}

.audiences {
  margin: 56px 0 88px;
}

.audiences__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

.audiences__grid :deep(.audience-card--wide) {
  grid-column: 1 / -1;
}

/* Tablet: 4:3 video cards get too narrow side by side below ~900px */
@media screen and (max-width: 900px) {
  .audiences__grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 767px) {
  /* Mobile stacks naturally; no forced viewport height */
  .proof {
    min-height: 0;
    padding: 28px 12px 16px;
  }

  .audiences {
    margin: 24px 0 48px;
  }

  .audiences__grid {
    gap: 16px;
  }
}
</style>
