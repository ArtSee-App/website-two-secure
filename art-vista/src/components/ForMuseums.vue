<template>
  <AudienceCard
    eyebrow="For museums"
    title="Enhance Visitor Experience"
    subtitle="Transform your museum into an interactive digital experience that engages visitors through their smartphones."
    tone="museums"
    cta="Contact us"
    wide
    :focusable="false"
    @click="goToContact"
    @cta="goToContact"
  />
</template>

<script setup>
import { useRouter } from 'vue-router';
import AudienceCard from '@/components/AudienceCard.vue';

const router = useRouter();

function goToContact() {
  router.push({ path: '/Contact', query: { highlight: 'museums' } });
}
</script>
