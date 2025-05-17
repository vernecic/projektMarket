<template>
  <div>
    <div class="flex justify-center items-center min-h-screen flex-col">
      <h1 class="text-blue-700 text-6xl font-bold">Welcome to Boovljak!</h1>
      <p class="text-4xl mt-5 font-bold">
        The place to safely <span class="italic">buy & sell</span> items you no
        longer need!
      </p>
      <div class="mt-10">
        <router-link to="/login">
          <button
            class="p-3 rounded-md bg-blue-500 text-white text-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-200"
          >
            Get started →
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
