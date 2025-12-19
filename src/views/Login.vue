<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'
import logo from '../assets/logo.png'
import kltower from '../assets/kltower.jpeg'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')

function login() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please enter email and password'
    return
  }

  // 模拟登录成功
  router.push('/dashboard')
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
        class="w-60 mx-auto mb-6"
        alt="Logo"
      />


      <h2 class="text-2xl font-bold text-center mb-6">
        Login
      </h2>

      <!-- Error message -->
      <p v-if="error" class="text-red-600 text-sm mb-4 text-center">
        {{ error }}
      </p>

      <!-- Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
      />

      <!-- Password + icon -->
      <div class="relative mb-2">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="w-full border p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
        />

        <button
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          @click="showPassword = !showPassword"
        >
          <Eye v-if="!showPassword" :size="20" />
          <EyeOff v-else :size="20" />
        </button>
      </div>

      <!-- New Member? 與 Forgot password? 同行 -->
      <div class="flex justify-between mb-6 text-sm">
        <router-link
          to="/signup"
          class="text-blue-600 hover:underline"
        >
          New user?
        </router-link>

        <router-link
          to="/forgot-password"
          class="text-blue-600 hover:underline"
        >
          Forgot password?
        </router-link>
      </div>

      <!-- Login button -->
      <button
        class="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition"
        @click="login"
      >
        Login
      </button>

    </div>
  </div>
</template>
