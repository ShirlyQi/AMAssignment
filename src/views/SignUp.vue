<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const address = ref('')
const error = ref('')

function submit() {
  if (!name.value || !email.value || !password.value || !phone.value || !address.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  // 模拟提交成功
  router.push('/dashboard')
}
</script>

<template>
  <div class="h-screen flex items-center justify-center relative">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-cover bg-center filter blur-sm" style="background-image: url('../assets/kltower.jpeg')"></div>

    <div class="relative w-96 bg-white p-8 rounded shadow-lg">
      <img src="../assets/logo.png" class="w-40 mx-auto mb-6" alt="Logo" />

      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <p v-if="error" class="text-red-600 text-sm mb-4 text-center">{{ error }}</p>

      <input v-model="name" placeholder="Name" class="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
      <input v-model="email" placeholder="Email" type="email" class="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
      <input v-model="password" placeholder="Password" type="password" class="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
      <input v-model="phone" placeholder="Phone" class="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
      <input v-model="address" placeholder="Address" class="w-full border p-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />

      <button @click="submit" class="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition">
        Create Account
      </button>
    </div>
  </div>
</template>
