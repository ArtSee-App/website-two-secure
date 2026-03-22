<template>
  <section class="reviews-section">
    <h2 class="reviews-title">What people are saying</h2>
    <div class="reviews-wrapper">
      <div class="reviews-track">
        <!-- Rendered twice for seamless infinite loop -->
        <div class="review-card" v-for="(review, index) in reviews" :key="'a' + index">
          <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="review-title">{{ review.title }}</p>
          <p class="review-body">{{ review.body }}</p>
          <p class="review-author">— {{ review.author }}</p>
        </div>
        <div class="review-card" v-for="(review, index) in reviews" :key="'b' + index" aria-hidden="true">
          <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="review-title">{{ review.title }}</p>
          <p class="review-body">{{ review.body }}</p>
          <p class="review-author">— {{ review.author }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Reviews',
  data() {
    return {
      reviews: [
        {
          title: 'Used it at the Rijksmuseum',
          body: "Went to Amsterdam last month and honestly didn't expect much. Recognised almost every painting instantly and gave way more context than the audio guide. Really impressed.",
          author: 'j*******'
        },
        {
          title: 'Pretty accurate',
          body: "tested it on maybe 20 artworks, got all but one right. the one it missed was pretty obscure so ill let it slide. does what it says",
          author: 'r*******'
        },
        {
          title: 'ok this is actually impressive',
          body: "my girlfriend dragged me to a museum and i ended up being the one who didnt want to leave lol. used artvista the whole time",
          author: 'k*******'
        },
        {
          title: 'Simple and it just works',
          body: "Simple, fast, accurate. Museum wifi is always terrible but this still worked fine. 5 stars.",
          author: 'm*******'
        },
        {
          title: '5 stars',
          body: "cant believe this is free. it recognised a caravaggio from a photo i took years ago that i could never identify. actually insane",
          author: 's*******'
        },
        {
          title: 'Waiting for the new features!!',
          body: "Love what's already here. Recommended it to everyone in my art class. Keep it up!",
          author: 'a*******'
        },
        {
          title: 'Finally an app that works',
          body: "Tried a few of these art scanner apps before and they were all terrible. This one actually works. Scanned a Vermeer and it nailed it immediately.",
          author: 'n*******'
        },
        {
          title: 'My kids love it too',
          body: "took my kids to the museum and they were bored until i showed them this. now theyre scanning everything and reading about the artists themselves. did not expect that",
          author: 'l*******'
        },
        {
          title: 'Genuinely surprised',
          body: "Downloaded it on a whim before a trip to Florence. Used it every single day. The context it gives you is actually interesting, not just Wikipedia copy paste.",
          author: 'f*******'
        },
        {
          title: 'Good app',
          body: "does what it promises. clean, no ads, no nonsense. rare these days",
          author: 'b*******'
        },
        {
          title: 'Scanned a piece from 1640!!',
          body: "Was not expecting it to recognise a 17th century Dutch Golden Age painting, but here we are. Genuinely impressive.",
          author: 'e*******'
        },
        {
          title: 'Wish I had this in art school',
          body: "As someone who studied art history this would have saved me so much time. The info it pulls up is actually solid. Using it now whenever I visit anything new.",
          author: 'c*******'
        },
        {
          title: 'Used it in the Prado',
          body: "Spent three hours in Madrid just scanning everything I could find. Handled Spanish Golden Age paintings no problem. Incredible.",
          author: 'h*******'
        },
        {
          title: 'Showed my whole friend group',
          body: "pulled it out at a gallery opening and now five of my friends have downloaded it. we all use it every time we go somewhere",
          author: 'o*******'
        },
        {
          title: 'Better than the official museum app',
          body: "most museums have their own apps and theyre always clunky and slow. this just works. recognised pieces the museums own app couldnt",
          author: 'p*******'
        },
        {
          title: 'Works on sculptures too',
          body: "Didn't think it would work on anything other than paintings but tried it on a Roman bust and it came up straight away. Really impressed.",
          author: 'i*******'
        },
        {
          title: 'Downloaded before Paris',
          body: "Got it the night before the Louvre. Used it nonstop. The Louvre is overwhelming but having this made it so much more manageable.",
          author: 'd*******'
        },
        {
          title: 'Showed my parents',
          body: "my parents are in their 60s and not really tech people but they figured it out in like two minutes. now my mum uses it every time she visits a gallery",
          author: 'g*******'
        },
        {
          title: 'changed how i travel honestly',
          body: "i go slower at museums now. scan more, read more. actually understand whats in front of me for the first time",
          author: 'w*******'
        },
        {
          title: 'Recognised a photo from 3 years ago',
          body: "Had a photo on my phone from a trip to Vienna that I never managed to identify. Scanned it and got the answer in seconds. Three years of wondering, done.",
          author: 't*******'
        },
        {
          title: 'So much better than reading plaques',
          body: "those tiny plaques on the wall never give you enough anyway. this gives you the whole story. way more interesting",
          author: 'v*******'
        },
        {
          title: 'One of my favourite apps',
          body: "Don't say this often but this is one of those apps I actually keep on my phone and use regularly. Really well made.",
          author: 'x*******'
        }
      ]
    };
  }
};
</script>

<style scoped>
.reviews-section {
  width: 100%;
  margin: 20px auto 60px;
  box-sizing: border-box;
}

.reviews-title {
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 28px;
  letter-spacing: -0.3px;
  padding: 0 20px;
}

.reviews-wrapper {
  position: relative;
  overflow: hidden;
}

/* Fade edges */
.reviews-wrapper::before,
.reviews-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 1;
  pointer-events: none;
}

.reviews-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #1a0933, transparent);
}

.reviews-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #1a0933, transparent);
}

.reviews-track {
  display: flex;
  gap: 16px;
  padding: 4px 0 8px;
  width: max-content;
  animation: marquee 120s linear infinite;
}

.reviews-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.review-card {
  min-width: 300px;
  max-width: 300px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(106, 29, 133, 0.4);
  border-radius: 16px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  backdrop-filter: blur(6px);
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.review-card:hover {
  border-color: rgba(106, 29, 133, 0.8);
  transform: translateY(-3px);
}

.stars {
  color: #f5a623;
  font-size: 1rem;
  letter-spacing: 2px;
}

.review-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.1px;
}

.review-body {
  color: rgba(233, 233, 233, 0.75);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.review-author {
  color: rgba(233, 233, 233, 0.25);
  font-size: 0.75rem;
  margin: 0;
  font-style: italic;
  letter-spacing: 1px;
}

@media screen and (max-width: 600px) {
  .reviews-title {
    font-size: 1.5rem;
  }

  .review-card {
    min-width: 260px;
    max-width: 260px;
  }
}
</style>
