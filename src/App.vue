<template>
  <div>
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";

import { computed } from "vue";

const route = useRoute();

const showNavbar = computed(() =>
  ["/feed", "/listings", "/orders", "/notifications"].includes(route.path)
);
</script>
