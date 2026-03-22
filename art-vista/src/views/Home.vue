<template>
  <div class="home">
    <Header />
    <Hero />
    <Reviews />
    <Stats />
    <div class="audience-row">
      <ForArtEnthusiasts />
      <ForArtists />
    </div>
    <ForMuseums />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
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
    Stats,
    ForArtEnthusiasts,
    ForArtists,
    ForMuseums,
    Reviews,
    Footer
  }
}
</script>

<style scoped>
.audience-row {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  align-items: stretch;
}

@media screen and (max-width: 767px) {
  .audience-row {
    flex-direction: column;
  }
}
</style>
