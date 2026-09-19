import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

// Only the Home view is in the main bundle; every other view is code-split
// into its own chunk and loaded on first navigation.
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api',
    name: 'Api',
    component: () => import('@/views/Api.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPostDetail',
    component: () => import('@/views/BlogPostDetail.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/Terms.vue')
  },
  // Redirect any unknown paths to Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Always scroll to the top when navigating to a new route
    return { top: 0 };
  }
});

export default router;
