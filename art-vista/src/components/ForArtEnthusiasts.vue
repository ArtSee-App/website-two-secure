<template>
  <AudienceCard
    eyebrow="For art enthusiasts"
    title="Your Personal Art Guide"
    subtitle="With every touch, ArtVista will personalize your art experience. Discover, learn, and connect like never before."
    tone="enthusiasts"
    :features="features"
    @click="scrollToTop"
  >
    <template #media>
      <PromoVideo :src="promoVideo" :poster="promoPoster" :width="598" :height="450" />
    </template>
  </AudienceCard>
</template>

<script setup>
import { reactive } from 'vue';
import AudienceCard from '@/components/AudienceCard.vue';
import PromoVideo from '@/components/PromoVideo.vue';
import promoVideo from '@/assets/promo.mp4';
import promoPoster from '@/assets/promo-poster.webp';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const features = reactive([
  {
    icon: '🖼️',
    title: 'Understand Art Better',
    description: 'Get quick answers for your art-related questions.'
  },
  {
    icon: '🤳',
    title: 'Scan and Discover',
    description: 'Instantly identify artworks with just a scan.'
  },
  {
    icon: '👩‍🎨',
    title: 'Connect with Artists',
    description: 'Bridge the gap between art lovers and creators.'
  }
]);
</script>
