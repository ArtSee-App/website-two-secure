<template>
  <AudienceCard
    eyebrow="For artists"
    title="Make Your Art Visible"
    subtitle="With ArtVista, showcase your work, gain exposure, and connect with art enthusiasts worldwide."
    tone="artists"
    :features="features"
    @click="openLoginPortal"
  >
    <template #media>
      <PromoVideo :src="promoVideo" :poster="promoPoster" :width="540" :height="404" />
    </template>
  </AudienceCard>
</template>

<script setup>
import { reactive } from 'vue';
import AudienceCard from '@/components/AudienceCard.vue';
import PromoVideo from '@/components/PromoVideo.vue';
import promoVideo from '@/assets/promo2.mp4';
import promoPoster from '@/assets/promo2-poster.webp';

function openLoginPortal() {
  window.open('https://portal.artvista.app/login', '_blank', 'noopener,noreferrer');
}

const features = reactive([
  {
    icon: '📱',
    title: 'Make Your Art Scannable',
    description: 'Let viewers discover your story with a scan.'
  },
  {
    icon: '💰',
    title: '(Coming Soon) Monetize Your Art',
    description: 'Sell directly to collectors, no commission fees.'
  },
  {
    icon: '🌐',
    title: 'Build Your Network',
    description: 'Connect with artists and enthusiasts worldwide.'
  }
]);
</script>
