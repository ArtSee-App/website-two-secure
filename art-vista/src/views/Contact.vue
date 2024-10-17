<!-- src/views/Contact.vue -->
<template>
  <div class="contact-page">
    <Header />
    <main>
      <h1 class="animated-title">Contact Us 📬</h1>
      <div class="subtitle-container">
        <p class="subtitle">
          Reach out to us for any inquiries, feedback, or assistance. In case the buttons below don't work, you can contact us at <a href="mailto:contact@artvista.app">contact@artvista.app</a>
        </p>
      </div>
      
      <!-- Contact Buttons -->
      <div class="contact-buttons">
        <button
          v-for="(option, index) in contactOptions"
          :key="index"
          class="contact-button"
          @click="handleContact(option.category)"
        >
          <span class="emoji">{{ option.emoji }}</span>
          <div class="text-container">
            <span class="text">{{ option.text }}</span>
            <span class="subtext">{{ option.subtext }}</span>
          </div>
        </button>
      </div>
    </main>
    
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Contact',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      contactOptions: [
        {
          emoji: "🎨",
          text: "Artists",
          subtext: "Are you an artist looking to connect? Reach out to us here.",
          category: "artists"
        },
        {
          emoji: "🖼️",
          text: "Exhibitions",
          subtext: "Questions about upcoming exhibitions or events? Get in touch.",
          category: "exhibitions"
        },
        {
          emoji: "🏛️",
          text: "Museums",
          subtext: "Reach out for any inquiries related to museums.",
          category: "museums"
        },
        {
          emoji: "🤝",
          text: "Partnerships",
          subtext: "Interested in collaborating on exciting projects?",
          category: "partnerships"
        },
        {
          emoji: "🛑",
          text: "Content Removal",
          subtext: "Need to report copyrighted or inappropriate content?",
          category: "content_removal"
        },
        {
          emoji: "📢",
          text: "Feedback",
          subtext: "We value your input! Share your thoughts and suggestions.",
          category: "feedback"
        },
        {
          emoji: "📧",
          text: "General Queries",
          subtext: "Have a question? We're here to help!",
          category: "general_queries"
        },
        {
          emoji: "🔒",
          text: "Account Problems",
          subtext: "Experiencing issues with your account? We're here to assist.",
          category: "account_problems"
        }
      ]
    };
  },
  methods: {
    handleContact(category) {
      const recipient = 'contact@artvista.app';
      let body = '';
      let subject = '';
      
      // Define subjects based on category
      switch(category) {
        case 'artists':
          subject = 'Artist Inquiry';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and specify details about your artwork, collaboration interests, or any inquiries you have.]\n';
          break;
        case 'exhibitions':
          subject = 'Exhibition Inquiry';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and include any details about the exhibition you are interested in showcasing or questions you have.]\n';
          break;
        case 'museums':
          subject = 'Museum Inquiry';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and provide any relevant details regarding the museum or your inquiry.]\n';
          break;
        case 'partnerships':
          subject = 'Partnership Inquiry';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and include your ideas for collaboration or any partnership details.]\n';
          break;
        case 'content_removal':
          subject = 'Content Removal Request';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and specify (the exact name showcased on the app) the content that needs to be removed and the reason for the removal request.]\n';
          break;
        case 'feedback':
          subject = 'Feedback';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and share your feedback, including suggestions or comments to help improve our services.]\n';
          break;
        case 'general_queries':
          subject = 'General Query';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and describe your question or the information you need.]\n';
          break;
        case 'account_problems':
          subject = 'Account Assistance';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and describe the issue you are having with your account, including any error messages or relevant information.]\n';
          break;
        default:
          subject = 'Contact Inquiry';
          body = 'Dear ArtVista Team,\n\n[Please replace this text with your message and provide as many relevant details as possible.]\n';
      }
      
      // Construct mailto link
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open the default mail application
      window.location.href = mailtoLink;
    }
  }
};
</script>

<style scoped>
.contact-page {
  padding-top: 80px; /* Adjust based on your header height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

main {
  max-width: 1200px; /* Increased max-width for larger screens */
  width: 100%;
  padding: 20px;
  text-align: center;
}

.animated-title {
  position: relative;
  text-align: center;
  color: #e9e9e9;
  margin-bottom: 20px; /* Reduced margin to accommodate subtitle */
  font-size: 2.5rem;
  cursor: pointer;
  overflow: hidden;
}

/* Subtitle Container Styling */
.subtitle-container {
  max-width: 600px; /* Adjust this value as needed */
  margin: 0 auto; /* Center the container */
}

.subtitle {
  font-size: 1.1rem;
  color: #e9e9e9;
  margin-bottom: 30px; /* Space between subtitle and buttons */
  line-height: 1.5;
}

/* Make the email address a clickable link */
.subtitle a {
  color: #03C1FD;
  text-decoration: underline;
}

/* Animated Title Hover Effect */
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

/* Contact Buttons Container */
.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 20px; /* Reduced gap for less space between buttons */
  flex-wrap: wrap;
  padding: 20px 0; /* Added top and bottom padding for spacing */
}

/* Individual Contact Button */
.contact-button {
  display: flex;
  align-items: flex-start; /* Align items to the top for better vertical alignment */
  justify-content: flex-start; /* Align content to the left horizontally */
  padding: 20px 25px; /* Adjusted padding for more space inside the button */
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 12px; /* Slightly increased border-radius for better aesthetics */
  cursor: pointer;
  color: #e9e9e9;
  font-size: 1.1rem; /* Slightly increased font size for better readability */
  transition: transform 0.3s ease, background 0.3s ease;
  width: 280px; /* Increased width to accommodate more content */
  min-height: 140px; /* Increased minimum height for better vertical spacing */
  position: relative;
  overflow: hidden;
}

.contact-button::before {
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
  border-radius: 12px; /* Match the button's border-radius */
}

/* Hover Effects for Contact Button */
.contact-button:hover::before {
  opacity: 1;
  animation: gradientAnimation 5s linear infinite;
}

.contact-button:hover,
.contact-button.active {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

/* Emoji Styling */
.contact-button .emoji {
  font-size: 2rem; /* Increased emoji size for better visibility */
  margin-right: 15px; /* Maintains space between emoji and text */
  flex-shrink: 0;
  margin-top: 5px; /* Align emoji vertically with the top of the text */
}

/* Text Container Styling */
.contact-button .text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align text to the left within the container */
  text-align: left; /* Ensure multiline text is left-aligned */
}

/* Main Text Styling */
.contact-button .text {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
}

/* Subtext Styling */
.contact-button .subtext {
  font-size: 1rem; /* Increased subtext size for better readability */
  font-weight: 300;
  line-height: 1.2;
  color: #e6e6e6; /* Lighter color for subtext */
  margin-top: 6px; /* Increased margin for better spacing below main text */
}

/* Responsive Adjustments */

/* Mobile Devices */
@media (max-width: 768px) {
  .animated-title {
    font-size: 1.8rem;
  }

  .subtitle-container {
    max-width: 100%;
    padding: 0 15px;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .contact-buttons {
    flex-direction: column;
    gap: 15px; /* Further reduced gap for better spacing on mobile */
    padding: 10px 0; /* Adjusted padding for mobile view */
  }

  .contact-button {
    width: 100%;
    max-width: 350px; /* Increased max-width for better mobile display */
    padding: 20px 15px; /* Adjusted padding for mobile */
    font-size: 1rem; /* Adjusted font size for mobile */
    min-height: 120px; /* Reduced min-height for mobile */
  }

  .contact-button .emoji {
    font-size: 1.8rem;
    margin-right: 10px;
    margin-top: 3px;
  }

  .contact-button .text {
    font-size: 1.1rem;
  }

  .contact-button .subtext {
    font-size: 0.9rem;
    margin-top: 4px;
  }
}
</style>
