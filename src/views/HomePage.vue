<template>
  <div class="flex justify-center items-center">
    <div class="flex gap-10 items-center">
      <div class="flex items-start w-3xl mt-10 justify-between">
        <h1 class="text-2xl">
          <span v-if="role === 'seller'">Your </span>Listings:
        </h1>

        <button
          v-if="role === 'seller'"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer shadow-md"
        >
          Create a listing
        </button>
      </div>
      <div class="mt-10 flex-col items-center">
        <div class="mb-5">
          <h1 class="text-xl">Balance: {{ balance }} €</h1>
        </div>
        <div>
          <input
            type="number"
            placeholder="Input amount"
            class="outline-0 px-1 py-2"
            v-model="deposit"
          />
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer shadow-md"
            @click="handleDeposit"
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const role = ref("");

const deposit = ref("");
const balance = ref("");

const handleDeposit = async () => {
  const amount = parseFloat(deposit.value);

  if (amount > 0) {
    const user = auth.currentUser;
    if (!user) {
      console.log("There is no user");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userRef, { balance: balance.value + amount });

      balance.value += amount;

      deposit.value = "";
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    console.log("Deposit must be over 0");
  }
};

const fetchBalance = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    console.log(userDoc.data());
    balance.value = userDoc.data().balance;
  }
};

onMounted(async () => {
  fetchBalance();
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      role.value = userDoc.data().role;
    }
  }
});
</script>
