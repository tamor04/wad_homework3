import Vue from 'vue';
import { createRouter, createWebHistory } from "vue-router";
import Index from "../AppIndex.vue"; // Main page
import Login from "../Login.vue"; // Login page

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: '/signup',
    name: 'SignUp',
    component: AppSignup,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: AppSignup, 
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AppSignup, 
  },
  {
    path: '/post',
    name: 'Post',
    component: AppSignup, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

