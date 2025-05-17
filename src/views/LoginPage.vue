<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <h1 class="text-blue-500 text-4xl font-bold">Login</h1>

    <form @submit.prevent="handleLogin">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Input your email:"
            v-model="email"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            v-model="password"
            required
          />
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer shadow-md"
        >
          Submit
        </button>

        <router-link to="/register" class="w-full">
          <button
            type="button"
            class="text-blue-700 bg-white border border-blue-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer shadow-md"
          >
            Register
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const email = ref("");
const password = ref("");

const router = useRouter();

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("Login successful", userCredential.user);

    router.push("/feed");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed: " + error.message);
  }
};
</script>
