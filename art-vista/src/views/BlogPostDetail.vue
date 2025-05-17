<template>
  <div class="blog-post-detail-page">
    <Header />
    <main>
      <div v-if="isLoading" class="loading-message">Loading post...</div>
      <div v-if="error" class="error-message">
        <h2>Oops! Something went wrong.</h2>
        <p>{{ error }}</p>
        <router-link to="/blog" class="back-link">Back to Blog</router-link>
      </div>
      <!-- The v-html directive is used here. Ensure content from /blog-posts/ is trusted. -->
      <div v-if="postHtml && !error" v-html="postHtml" class="post-content-wrapper"></div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const postHtml = ref(null);
const isLoading = ref(true);
const error = ref(null);

async function fetchPost(slug) {
  if (typeof slug !== 'string' || !slug) {
    error.value = 'Invalid blog post identifier. Please check the URL.';
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  error.value = null;
  postHtml.value = null;

  try {
    // Assumes HTML files are in the /public directory, served at the root.
    // e.g., public/blog-posts/hello-world.html -> /blog-posts/hello-world.html
    const response = await fetch(`/blog-posts/${slug}.html`);
    if (!response.ok) {
      if (response.status === 404) {
        error.value = `The blog post titled '${slug}' could not be found. It might have been moved or deleted.`
      } else {
        error.value = `Could not load blog post. Server responded with status: ${response.status}`;
      }
      throw new Error(`Failed to fetch post: ${slug}`);
    }
    const rawHtml = await response.text();
    // Simple sanitization: ensure it's wrapped in a known class if the HTML file itself doesn't guarantee it.
    // The HTML file provided *does* include a wrapper, so this is mostly demonstrative or a fallback.
    // If the fetched HTML *always* has a root <div class="blog-post-content">, this isn't strictly needed.
    // postHtml.value = `<div class="blog-post-actual-content">${rawHtml}</div>`; 
    postHtml.value = rawHtml; // Assuming rawHTML already has the desired structure, e.g. a root div.

  } catch (err) {
    console.error('Error fetching blog post:', err);
    if (!error.value) { // If a specific error wasn't set above
        error.value = 'An unexpected error occurred while loading the blog post. Please try again later.';
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  if (route.params.slug) {
    fetchPost(route.params.slug);
  }
});

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    fetchPost(newSlug);
  } else if (route.path.startsWith('/blog/')) {
    // Handle cases where slug becomes undefined but we are still on a blog post path conceptually
    // This might happen if the route is programmatically changed to /blog/ without a slug
    error.value = 'No blog post specified.';
    isLoading.value = false;
    postHtml.value = null;
  }
});
</script>

<style scoped>
.blog-post-detail-page {
  padding-top: 80px; /* Match header height */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  max-width: 800px; /* Consistent with a readable blog format */
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
}

.loading-message,
.error-message {
  text-align: center;
  color: #e9e9e9;
  padding: 40px 0;
}

.error-message h2 {
  color: #ff6b6b; /* A distinct error color */
  margin-bottom: 15px;
}

.error-message p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.back-link {
  color: #03C1FD;
  text-decoration: none;
  font-weight: 500;
}
.back-link:hover {
  text-decoration: underline;
}

/* Styles for the content injected by v-html */
/* Using :deep() to style content within v-html */
.post-content-wrapper :deep(.blog-post-content) {
  color: #e9e9e9; /* Base text color */
  line-height: 1.7;
  font-size: 1rem; /* Base font size for paragraphs */
}

.post-content-wrapper :deep(h1) {
  font-size: 2.2rem; /* Main title of the post */
  color: #ffffff;
  margin-bottom: 25px;
  margin-top: 10px;
  line-height: 1.3;
}

.post-content-wrapper :deep(h2) {
  font-size: 1.8rem;
  color: #ffffff;
  margin-top: 30px;
  margin-bottom: 20px;
  line-height: 1.4;
}

.post-content-wrapper :deep(h3) {
  font-size: 1.5rem;
  color: #e0e0e0;
  margin-top: 25px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.post-content-wrapper :deep(p) {
  margin-bottom: 20px;
  font-size: 1.05rem; /* Slightly larger for readability */
}

.post-content-wrapper :deep(ul),
.post-content-wrapper :deep(ol) {
  margin-left: 20px;
  margin-bottom: 20px;
  padding-left: 20px; /* Indentation for list items */
}

.post-content-wrapper :deep(li) {
  margin-bottom: 10px;
}

.post-content-wrapper :deep(a) {
  color: #03C1FD; /* A bright, clickable color */
  text-decoration: none;
}

.post-content-wrapper :deep(a:hover) {
  text-decoration: underline;
}

.post-content-wrapper :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: block; /* Center images if they are block */
  margin-left: auto;
  margin-right: auto;
}

.post-content-wrapper :deep(blockquote) {
  border-left: 4px solid #03C1FD;
  margin: 20px 0;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #cccccc;
  font-style: italic;
}

.post-content-wrapper :deep(pre), 
.post-content-wrapper :deep(code) {
  background-color: #2d2d2d; /* Dark background for code blocks */
  color: #f0f0f0; /* Light text for code */
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.95em;
}

.post-content-wrapper :deep(pre) {
  padding: 15px;
  overflow-x: auto; /* Allow scrolling for wide code blocks */
}

@media (max-width: 768px) {
  main {
    padding: 20px 15px;
  }
  .post-content-wrapper :deep(h1) {
    font-size: 1.8rem;
  }
  .post-content-wrapper :deep(h2) {
    font-size: 1.5rem;
  }
  .post-content-wrapper :deep(p) {
    font-size: 1rem;
  }
}
</style> 