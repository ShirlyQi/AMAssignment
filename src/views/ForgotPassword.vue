<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'
import kltower from '../assets/kltower.jpeg'

const router = useRouter()
const email = ref('')
const message = ref('')

function submit() {
  if (!email.value) {
    message.value = 'Please enter your email'
    return
  }

  // 模拟发送成功
  message.value = 'Password reset link has been sent to your email'
}
</script>

<template>
  <div class="h-screen flex items-center justify-center relative">
    <!-- 背景圖 + 模糊 -->
    <div
      class="absolute inset-0 bg-cover bg-center filter blur-sm"
      :style="{ backgroundImage: `url(${kltower})` }"
    ></div>

    <!-- 白色內容卡片 -->
    <div class="relative w-96 bg-white p-8 rounded shadow-lg">

      <!-- Logo -->
      <img
        :src="logo"
        class="w-40 mx-auto mb-6"
        alt="Logo"
      />

      <h2 class="text-2xl font-bold text-center mb-6">
        Forgot Password
      </h2>

      <!-- Message -->
      <p
        v-if="message"
        class="text-sm text-center mb-4 text-amber-700"
      >
        {{ message }}
      </p>

      <!-- Email Input -->
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full border p-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
      />

      <!-- Send Button -->
      <button
        class="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition"
        @click="submit"
      >
        Send Reset Link
      </button>

      <!-- Back to Login -->
      <button
        class="w-full mt-4 text-sm text-gray-500 hover:underline"
        @click="router.push('/login')"
      >
        Back to Login
      </button>

    </div>
  </div>
</template>
