<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import kltower from '../assets/kltower.jpeg'

const router = useRouter()
const profile = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  profilePicture: null
})

onMounted(() => {
  // 從 route.state 取資料
  if (history.state && history.state.name) {
    profile.value = { ...history.state }
  } else {
    // 如果沒資料，跳回 login 或 signup
    router.push('/login')
  }
})
</script>

<template>
  <div class="h-screen flex items-center justify-center relative">
    <!-- 背景圖 + 模糊 -->
    <div
      class="absolute inset-0 bg-cover bg-center filter blur-sm opacity-60"
      :style="{ backgroundImage: `url(${kltower})` }"
    ></div>

    <!-- 白色內容卡片 -->
    <div class="relative w-96 bg-white p-8 rounded shadow-lg z-10">
      <h2 class="text-2xl font-bold mb-6 text-center">Profile</h2>

      <!-- Profile Picture -->
      <div class="flex justify-center mb-4">
        <img
          v-if="profile.profilePicture"
          :src="profile.profilePicture"
          alt="Profile Picture"
          class="w-24 h-24 rounded-full object-cover border"
        />
        <div
          v-else
          class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"
        >
          No Image
        </div>
      </div>

      <!-- Name -->
      <p class="mb-2"><strong>Full Name:</strong> {{ profile.name }}</p>

      <!-- Email -->
      <p class="mb-2"><strong>Email:</strong> {{ profile.email }}</p>

      <!-- Phone -->
      <p class="mb-2"><strong>Phone:</strong> {{ profile.phone }}</p>

      <!-- Address -->
      <p class="mb-4"><strong>Address:</strong> {{ profile.address }}</p>

      <button
        class="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition"
        @click="router.push('/login')"
      >
        Logout / Back to Login
      </button>
    </div>
  </div>
</template>
