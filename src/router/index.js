import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import Login from "@/views/LoginPage.vue";
import Register from "@/views/RegisterPage.vue";
import Feed from "@/views/Feed.vue";

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
    path: "/feed",
    component: Feed,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
