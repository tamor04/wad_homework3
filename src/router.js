import { createRouter, createWebHistory } from 'vue-router';
import AppIndex from '../AppIndex.vue';
import AppLogin from '../AppLogin.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppIndex,  // Set AppIndex as the component for the home route

  },
  {
    path: '/login',
    name: 'Login',
    component: AppLogin,
  }
  // You can add more routes here if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
