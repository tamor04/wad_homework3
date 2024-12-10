import { createRouter, createWebHistory } from 'vue-router';
import AppIndex from '../AppIndex.vue';
import AppLogin from '../AppLogin.vue';
import AppSignup from '../AppSignup.vue';

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
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: AppSignup,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: AppSignup, //muuta AppContact'iks kui see tehtud saab
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AppSignup, //muuta AppAddPost'iks kui see tehtud saab
  },
  {
    path: '/post',
    name: 'Post',
    component: AppSignup, //muuta AppPost'iks kui see tehtud saab
  },
  
  // You can add more routes here if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
