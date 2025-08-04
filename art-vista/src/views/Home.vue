<template>
  <div class="home">
    <Header />
    <Hero />
    <PromoVideo />
    <Stats />
    <ForArtEnthusiasts />
    <ForArtists />
    <ForMuseums />
    <WebDesign />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import Stats from '@/components/Stats.vue'
import ForArtEnthusiasts from '@/components/ForArtEnthusiasts.vue'
import ForArtists from '@/components/ForArtists.vue'
//import ForMuseums from '@/components/ForMuseums.vue'
//import WebDesign from '@/components/WebDesign.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    Stats,
    ForArtEnthusiasts,
    ForArtists,
    //ForMuseums,
    //WebDesign,
    Footer
  }
}
</script>