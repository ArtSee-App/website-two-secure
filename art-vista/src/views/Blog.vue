<template>
  <div class="blog-page">
    <Header/>
    <main>
      <h1 class="animated-title">Blog & News by ArtVista 📝</h1>
      <div class="subtitle-container">
        <p class="subtitle">
          We will be sharing stories from the world of art, art-tech, and ArtVista.
        </p>
      </div>
      
      <!-- Container for Subscription -->
      <div class="newsletter-container">
        <div class="newsletter-content">
          <h2>Subscribe to Our News</h2>
          <p v-if="!isSubscribed">
            Be the first to know about our latest articles and updates!
          </p>
          <p v-else class="success-message">
            Thank you for subscribing! We'll keep you updated.
          </p>
          <form class="newsletter-form" @submit.prevent="handleSubmit">
            <div class="form-group" v-if="!isSubscribed">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                required
                class="email-input"
              />
              <button type="submit" class="submit-button">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Blog Post List Section -->
      <div class="blog-posts-list-container">
        <div class="blog-post-items">
          <div class="blog-post-card">
            <router-link to="/blog/journey-2023-2025" class="card-link-wrapper">
              <img
                src="https://res.cloudinary.com/dejerkmnu/image/upload/q_auto,f_auto,w_1200/the-wanderer-above-the-sea-of-fog_nub2km.jpg"
                alt="The Wanderer Above the Sea of Fog painting"
                class="card-image"
              />
              <div class="card-text-content">
                <h3 class="card-title">Journey of ArtVista (2022-2025)</h3>
                <div class="card-excerpt-container">
                  <p class="card-excerpt">We are sharing the journey of ArtVista from 2022 to 2025.</p>
                  <p class="card-excerpt">The lows, the highs, the lessons we learned.</p>
                </div>
              </div>
            </router-link>
          </div>
          <!-- More posts here -->
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Blog',
  components: { Header, Footer },
  data() {
    return {
      isSubscribed: false,
      email: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await fetch('/.netlify/functions/save_email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email_to_save: this.email })
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.message || res.statusText)
        }
        this.isSubscribed = true
        this.email = ''
      } catch (err) {
        console.error('Subscription error:', err)
        alert('An error occurred. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.blog-page {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: auto;
}

main {
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  text-align: center;
}

.animated-title {
  position: relative;
  text-align: center;
  color: #e9e9e9;
  margin-bottom: 20px;
  font-size: 2.5rem;
  overflow: hidden;
}

.subtitle-container {
  max-width: 600px;
  margin: 0 auto;
}

.subtitle {
  font-size: 1.1rem;
  color: #e9e9e9;
  margin-bottom: 15px;
  line-height: 1.5;
}

.newsletter-container {
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
}

.newsletter-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(10px);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 1;
  text-align: center;
}

.newsletter-content h2 {
  color: #e9e9e9;
  font-size: 2rem;
  margin-bottom: 15px;
}

.newsletter-content p {
  color: #e9e9e9;
  font-size: 1.1rem;
  margin-bottom: 25px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-form {
  width: 100%;
}

.form-group {
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

.email-input {
  flex: 1;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #e9e9e9;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.email-input:focus {
  border-color: #03C1FD;
}

.email-input::placeholder {
  color: rgba(233, 233, 233, 0.6);
}

.submit-button {
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
  border-radius: 12px;
}

.submit-button:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
}

.submit-button:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

@media screen and (max-width: 992px) {
  .blog-post-card {
    display: flex;
    flex-direction: column;
  }
  
  .card-link-wrapper {
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
    height: 200px;
  }
  
  .card-text-content {
    padding-left: 0;
    padding-top: 20px;
    border-left: none;
    margin-left: 0;
  }
}

@media screen and (max-width: 768px) {

  .card-title {
    text-align: center;
  }

  .card-excerpt {
    text-align: center;
  }
  
  /* subscribe button bottom */
  .form-group {
    flex-direction: column;
  }
  
  /* match widths */
  .newsletter-content,
  .blog-posts-list-container {
    width: 95%;
    max-width: 95%;
    margin: 0 auto;
  }

  /* vertical posts */
  .blog-post-items {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  /* card adjustments */
  .blog-post-card {
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 20px !important;
  }

  /* ensure stacked under image and no line */
  .blog-post-card,
  .card-link-wrapper {
    flex-direction: column !important;
  }

  .card-link-wrapper {
    align-items: center;
  }

  .card-image {
    width: 85%;
  }

  .card-text-content {
    border-left: none !important;
    margin-left: 0 !important;
    padding-left: 0 !important;
    padding-top: 20px;
    text-align: center;
  }
}

.success-message {
  color: #e9e9e9;
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  white-space: nowrap;
  position: relative;
  letter-spacing: -0.2px;
  font-weight: 500;
  animation: fadeIn 0.5s ease;
  text-align: center;
  width: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-posts-list-container {
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
}

.blog-post-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.blog-post-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;
  overflow: hidden;
  text-decoration: none;
  gap: 0;
  position: relative;
}

.blog-post-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
  border-radius: 20px;
}

.blog-post-card:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
}

.blog-post-card:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.2);
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.card-link-wrapper {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0;
}

.card-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin: 0;
  flex-shrink: 0;
}

.card-text-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1;
  justify-content: center;
  padding-left: 30px;
  position: relative;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 20px;
}

.card-text-content::before {
  display: none;
}

.card-title {
  color: #e9e9e9;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 25px;
  margin-top: 25px;
}

.card-excerpt-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  margin-top: 0px;
}

.card-excerpt {
  color: #c0c0c0;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  flex: 1;
}

/* Remove old .post-link and .post-excerpt styles if they are no longer needed globally */
.post-link {
  display: none;
}

.post-excerpt {
  display: none;
}
</style>
