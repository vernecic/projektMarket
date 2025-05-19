<template>
  <div class="flex justify-center items-center">
    <div class="flex gap-10 items-start">
      <div class="group rounded-xl px-3 py-4">
        <div class="flex items-start w-3xl mt-10 justify-between">
          <h1 class="text-2xl">
            <h1 v-if="!showCreateListing">
              <span v-if="role === 'seller'">Your </span>Listings:
            </h1>
          </h1>

          <button
            v-if="role === 'seller'"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer shadow-md"
            @click="handleCreateListing"
          >
            Create a listing
          </button>
        </div>
        <div v-if="showCreateListing" class="flex justify-center mt-10 px-4">
          <div class="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
            <h1 class="text-2xl font-semibold text-center mb-6">
              Create a Listing
            </h1>
            <div class="mb-4">
              <label
                for="image"
                clas="block text-sm font-medium text-gray-700 mb-1"
                >Upload image:</label
              >
              <input
                id="image"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="block w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
              />

              <div v-if="previewImage" class="mt-4">
                <img
                  :src="previewImage"
                  alt="Preview"
                  class="w-full h-auto rounded-lg shadow"
                />
              </div>
            </div>

            <div class="mb-4">
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Title</label
              >
              <input
                id="title"
                type="text"
                v-model="title"
                placeholder="Enter the listing title"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              />
            </div>

            <div class="mb-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Description</label
              >
              <textarea
                id="description"
                v-model="description"
                placeholder="Describe your listing..."
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              ></textarea>
            </div>

            <div class="mb-6">
              <label
                for="price"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Price (€)</label
              >
              <input
                id="price"
                type="number"
                v-model="price"
                placeholder="Set a price"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              />
            </div>

            <button
              @click="submitListing"
              class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Submit Listing
            </button>
          </div>
        </div>
      </div>
      <div
        class="group mt-10 flex-col items-center border rounded-xl px-3 py-4 shadow-lg hover:border-blue-700 cursor-pointer"
      >
        <div class="mb-5">
          <h1>{{ username }}</h1>
          <h1 class="text-xl">Balance: {{ balance }} €</h1>
        </div>
        <div v-if="role === 'buyer'">
          <input
            type="number"
            placeholder="Input amount"
            class="outline-0 px-1 py-2 bg-gray-100"
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
const username = ref("");

const showCreateListing = ref(false);

// listing variable
const image = ref(null);
const title = ref("");
const description = ref("");
const price = ref("");

const previewImage = ref(null);

// local preview
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    image.value = file;
    previewImage.value = URL.createObjectURL(file);
  } else {
    image.value = null;
    previewImage.value = null;
  }
};

// fetch username
const fetchUsername = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    username.value = userDoc.data().username;
  }
};

// create listing
const handleCreateListing = () => {
  showCreateListing.value = true;
};

const submitListing = async () => {};

// deposit
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
// deposit - prikaz
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

const fetchRole = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      role.value = userDoc.data().role;
    }
  }
};

onMounted(async () => {
  fetchBalance();
  fetchRole();
  fetchUsername();
});
</script>
