import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/global.css'; // Global CSS dosyasını ekliyoruz

createApp(App).use(store).use(router).mount('#app');
