import { createRouter, createWebHistory } from 'vue-router';
import AppIndex from '../AppIndex.vue';
import AppLogin from '../AppLogin.vue';
import AppSignup from '../AppSignup.vue';
import AppContact from '../AppContact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppIndex,  

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
    component: AppContact, 
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
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
