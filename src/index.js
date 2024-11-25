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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

