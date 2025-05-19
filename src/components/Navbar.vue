<template>
  <nav class="bg-white border-gray-200">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <p class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
        <span
          class="self-center text-4xl whitespace-nowrap text-blue-900 font-bold hover:text-blue-700"
          >Boovljak</span
        >
      </p>

      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-white"
        >
          <li>
            <router-link
              to="/feed"
              class="block bg-blue-700 rounded-sm md:bg-transparent p-0 cursor-pointer"
              :class="{
                'text-blue-700': route.path === '/feed',
                'text-gray-900 md:hover:text-blue-700': route.path !== '/feed',
              }"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/orders"
              class="block bg-blue-700 rounded-sm md:bg-transparent p-0 cursor-pointer"
              :class="{
                'text-blue-700': route.path === '/orders',
                'text-gray-900 md:hover:text-blue-700':
                  route.path !== '/orders',
              }"
              >Orders</router-link
            >
          </li>
          <li>
            <a
              href="#"
              class="block bg-blue-700 rounded-sm md:bg-transparent p-0 cursor-pointer"
              :class="{
                'text-blue-700': route.path === '/notifications',
                'text-gray-900 md:hover:text-blue-700':
                  route.path !== '/notifications',
              }"
              >Notifications</a
            >
          </li>

          <li>
            <a
              href="#"
              class="block bg-blue-700 rounded-sm md:bg-transparent p-0 cursor-pointer text-gray-900 hover:text-blue-700"
              @click="handleSignOut"
              >Log out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("Signed out!");
    router.push("/");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};

const route = useRoute();
</script>
