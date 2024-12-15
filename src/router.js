import { createRouter, createWebHistory } from 'vue-router';
import AppIndex from '../AppIndex.vue';
import AppLogin from '../AppLogin.vue';
import AppSignup from '../AppSignup.vue';
import AppContact from '../AppContact.vue';
import AppAddPost from '../AppAddPost.vue';
import AppPost from '../AppPost.vue';
import auth from "@/auth";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppIndex,
    beforeEnter: async(to, from, next) => {                  //checks if user is logged in or not
      let authResult = await auth.authenticated();          // if not, sends to the login page
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }

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
    component: AppAddPost,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }
  },
  {
    path: '/post/:id',          
    name: 'Post',
    component: AppPost,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
