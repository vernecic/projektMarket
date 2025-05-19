import { createWebHistory, createRouter } from "vue-router";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

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

router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser;
  if (to.path === "/register" || to.path === "/login") {
    next();
    return;
  }
  if (!user) {
    next("/login");
    return;
  }
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    console.log("No user");
    next("/login");
    return;
  }

  next();
});

export default router;
