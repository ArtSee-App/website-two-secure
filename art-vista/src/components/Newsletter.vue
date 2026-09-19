<template>
  <!-- Newsletter Subscription -->
  <div class="newsletter-section">
    <p v-if="!isSubscribed">Subscribe to our newsletter for the latest insights</p>
    <p v-else class="success-message">Thank you for subscribing! We'll keep you updated with the latest art insights.</p>
    <form class="newsletter-form" @submit.prevent="subscribe">
      <div class="form-group" v-if="!isSubscribed">
        <input 
          type="email" 
          name="email" 
          placeholder="Enter your email" 
          required
          class="email-input"
          v-model="email"
        />
        <button type="submit" class="submit-button" :disabled="isSubmitting">Subscribe</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useNewsletter } from '@/composables/useNewsletter';

export default {
  name: 'Newsletter',
  setup() {
    // Shared newsletter signup logic (also used on the Blog page)
    return useNewsletter();
  }
};
</script>

<style scoped>
.newsletter-section {
  margin-top: 30px;
  padding: 20px 0;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 80%,
    transparent 100%);
}

.newsletter-section p {
  color: #e9e9e9;
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  white-space: nowrap;
  position: relative;
  letter-spacing: -0.2px;
  font-weight: 500;
}

.newsletter-form {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 800px;
}

.form-group {
  display: flex;
  gap: 12px;
  width: 100%;
}

.email-input {
  flex: 1;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #e9e9e9;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  min-width: 300px;
}

.email-input:focus {
  border-color: #03C1FD;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(3, 193, 253, 0.15);
}

.email-input::placeholder {
  color: rgba(233, 233, 233, 0.5);
  font-size: 1rem;
}

.submit-button {
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  min-width: 120px;
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
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
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

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Tablet: the one-line label + input + button row overflows below ~1000px */
@media screen and (max-width: 1000px) {
  .newsletter-section {
    flex-direction: column;
    gap: 16px;
  }

  .newsletter-section p {
    white-space: normal;
    text-align: center;
  }

  .newsletter-form {
    width: 100%;
    max-width: 640px;
  }
}

@media screen and (max-width: 768px) {
  .newsletter-section {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .newsletter-section p {
    font-size: 1.1rem;
    text-align: center;
    white-space: normal;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .newsletter-form {
    width: 100%;
  }

  .form-group {
    flex-direction: column;
    width: 100%;
  }

  .email-input {
    min-width: 100%;
    padding: 10px 20px;
  }

  .submit-button {
    width: 100%;
    min-width: 100%;
    padding: 10px 24px;
  }

  .success-message {
    text-align: center;
    white-space: normal;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
