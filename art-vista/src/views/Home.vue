<template>
  <div class="home">
    <Header />
    <Hero />
    <PromoVideo />
    <Stats />
    <AppDesign />
    <WebDesign />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import Stats from '@/components/Stats.vue'
import AppDesign from '@/components/AppDesign.vue'
//import WebDesign from '@/components/WebDesign.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    Stats,
    AppDesign,
    //WebDesign,
    Footer
  }
}
</script>