import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import Login from "@/views/LoginPage.vue";
import Register from "@/views/RegisterPage.vue";
import Feed from "@/views/Feed.vue";
import HomePage from "@/views/HomePage.vue";
import Orders from "@/views/Orders.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/feed",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
