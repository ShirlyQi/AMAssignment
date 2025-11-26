<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import kltower from '../assets/kltower.jpeg' 
import logo from '../assets/logo.png'        // Logo

const router = useRouter()
const profile = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  profilePicture: null
})

onMounted(() => {
  if (history.state && history.state.name) {
    profile.value = { ...history.state }
  } else {
    router.push('/login')
  }
})

function backToLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="h-screen flex items-center justify-center relative">

    <div
      class="absolute inset-0 bg-cover bg-center filter blur-sm"
      :style="{ backgroundImage: `url(${kltower})` }"
    ></div>

    
    <div class="relative w-96 bg-white p-8 rounded shadow-lg">
      <!-- Logo -->
      <img :src="logo" class="w-60 mx-auto mb-6" alt="Logo" />

      <h2 class="text-2xl font-bold mb-6 text-center">Profile</h2>

      <!-- Profile Picture -->
      <div class="flex justify-center mb-4">
        <img
          v-if="profile.profilePicture"
          :src="profile.profilePicture"
          class="w-24 h-24 rounded-full object-cover border"
        />
        <div
          v-else
          class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"
        >
          No Image
        </div>
      </div>

   
      <p class="mb-2"><strong>Full Name:</strong> {{ profile.name }}</p>
      <p class="mb-2"><strong>Email:</strong> {{ profile.email }}</p>
      <p class="mb-2"><strong>Phone:</strong> {{ profile.phone }}</p>
      <p class="mb-4"><strong>Address:</strong> {{ profile.address }}</p>

     
      <button
        class="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition"
        @click="backToLogin"
      >
        Back to Login
      </button>
    </div>
  </div>
</template>
