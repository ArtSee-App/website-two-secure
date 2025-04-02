<template>
  <div class="blog-page">
    <Header />
    <main>
      <h1 class="animated-title">Blog 📝</h1>
      <div class="subtitle-container">
        <p class="subtitle">
          Our blog is coming soon! We're working on creating amazing content about art, technology, and the intersection of both worlds.
        </p>
      </div>
      
      <!-- Newsletter Signup Form -->
      <div class="newsletter-container">
        <div class="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p v-if="!isSubscribed">Be the first to know when we launch our blog!</p>
          <p v-else class="success-message">Thank you for subscribing! We'll keep you updated with our latest blog posts.</p>
          <form v-if="!isSubscribed" name="newsletter" method="POST" data-netlify="true" class="newsletter-form" @submit.prevent="handleSubmit">
            <input type="hidden" name="form-name" value="newsletter" />
            <div class="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                required
                class="email-input"
                v-model="email"
              />
              <button type="submit" class="submit-button">Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Coming Soon Content -->
      <div class="coming-soon-container">
        <div class="coming-soon-content">
          <span class="emoji">🚀</span>
          <h2>Stay Tuned</h2>
          <p>We're crafting insightful articles about:</p>
          <ul class="feature-list">
            <li>Art History & Culture</li>
            <li>Digital Art & Technology</li>
            <li>Artist Spotlights</li>
            <li>Exhibition Reviews</li>
            <li>Art Market Insights</li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Blog',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isSubscribed: false,
      email: ''
    }
  },
  methods: {
    handleSubmit() {
      // Here you would typically handle the form submission
      // For now, we'll just simulate a successful subscription
      this.isSubscribed = true;
      this.email = '';
    }
  }
};
</script>

<style scoped>
.blog-page {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
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
  cursor: pointer;
  overflow: hidden;
}

.subtitle-container {
  max-width: 600px;
  margin: 0 auto;
}

.subtitle {
  font-size: 1.1rem;
  color: #e9e9e9;
  margin-bottom: 30px;
  line-height: 1.5;
}

.animated-title::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
  background-size: 400% 400%;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
  border-radius: 8px;
}

.animated-title:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
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

.coming-soon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.coming-soon-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  backdrop-filter: blur(10px);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 1;
}

.coming-soon-content .emoji {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.coming-soon-content h2 {
  color: #e9e9e9;
  font-size: 2rem;
  margin-bottom: 20px;
}

.coming-soon-content p {
  color: #e9e9e9;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.feature-list li {
  color: #e9e9e9;
  font-size: 1.1rem;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.feature-list li:hover {
  transform: none;
  background: rgba(255, 255, 255, 0.05);
}

@media screen and (max-width: 768px) {
  .coming-soon-content {
    padding: 30px 20px;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }
}

.newsletter-container {
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.newsletter-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
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

@media screen and (max-width: 768px) {
  .form-group {
    flex-direction: column;
  }

  .submit-button {
    width: 100%;
  }

  .newsletter-content {
    padding: 30px 20px;
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

@media screen and (max-width: 768px) {
  .success-message {
    text-align: center;
    white-space: normal;
  }
}
</style> 