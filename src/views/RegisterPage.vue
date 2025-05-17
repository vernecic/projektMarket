<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <h1 class="text-blue-500 text-4xl font-bold">Register</h1>

    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2 mt-5">
        <div class="mb-6">
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Input your username:"
            v-model="username"
            required
          />
        </div>

        <div class="mb-6">
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
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            v-model="password"
            required
          />
        </div>

        <div class="mb-6">
          <input
            type="password"
            id="confirm_password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            v-model="confirmPassword"
            required
          />
        </div>

        <div class="col-span-2 mb-6">
          <p class="block mb-2 text-sm font-medium text-gray-900">Role</p>
          <div class="flex gap-6">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="buyer"
                v-model="role"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span>Buyer</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="seller"
                v-model="role"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span>Seller</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer shadow-md"
        >
          Submit
        </button>

        <router-link to="/login" class="w-full">
          <button
            type="button"
            class="text-blue-700 bg-white border border-blue-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer shadow-md"
          >
            Login
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref(null);
</script>
