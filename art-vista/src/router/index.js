import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Api from '@/views/Api.vue';
import About from '@/views/About.vue';
import Contact from '@/views/Contact.vue';
import Terms from '@/views/Terms.vue';
import Blog from '@/views/Blog.vue';
import BlogPostDetail from '@/views/BlogPostDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api',
    name: 'Api',
    component: Api
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:slug',
    name: 'BlogPostDetail',
    component: BlogPostDetail,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
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
