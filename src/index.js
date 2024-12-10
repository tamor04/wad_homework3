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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

