<!-- src/views/Api.vue -->
<template>
  <div class="api-page">
    <Header />
    <main>
      <HeroApi />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import HeroApi from '@/components/HeroApi.vue';
import Footer from '@/components/Footer.vue';


export default {
  name: 'Api',
  components: {
    Header,
    HeroApi,
    Footer
  }
};
</script>

<style scoped>
.api-page {
  padding-top: 80px; /* Adjust based on your header height */
  /* Add your styles here */
}
</style>
