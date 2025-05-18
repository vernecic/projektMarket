<template>
  <div class="flex justify-center items-center">
    <div class="flex items-start w-3xl mt-10 justify-between">
      <h1 class="text-2xl">Listings:</h1>
      <button
        v-if="role === 'seller'"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer shadow-md"
      >
        Create a listing
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const role = ref("");

onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      role.value = userDoc.data().role;
    }
  }
});
</script>
