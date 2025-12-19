<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'
import logo from '../assets/logo.png'
import kltower from '../assets/kltower.jpeg'

const router = useRouter()

// 表單欄位
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const address = ref('')

// 密碼顯示切換
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 錯誤訊息和加載狀態
const error = ref('')
const isLoading = ref(false)

// 註冊提交
async function signUp() {
  // 重置錯誤訊息
  error.value = ''
  isLoading.value = true

  try {
    // 驗證必填欄位
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
      throw new Error('Please fill in all required fields')
    }

    // 驗證郵箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      throw new Error('Please enter a valid email address')
    }

    // 驗證密碼長度
    if (password.value.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    // 驗證密碼匹配
    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }

    // 準備註冊數據
    const userData = {
      name: name.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: password.value,
      phone: phone.value ? phone.value.trim() : '',
      address: address.value ? address.value.trim() : ''
    }

    // 調用後端註冊 API
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()

    // 處理 API 響應
    if (!data.success) {
      throw new Error(data.message || 'Registration failed')
    }

    // 註冊成功處理
    handleRegistrationSuccess(data)

  } catch (err) {
    // 錯誤處理
    handleRegistrationError(err)
  } finally {
    isLoading.value = false
  }
}

// 註冊成功處理函數
function handleRegistrationSuccess(data) {
  // 存儲認證信息
  localStorage.setItem('auth_token', data.token)
  localStorage.setItem('user_info', JSON.stringify(data.user))
  
  // 顯示成功消息
  alert('🎉 Registration successful! Welcome to Visit Malaysia 2026!')
  
  // 重定向到儀表板
  router.push('/dashboard')
}

// 註冊錯誤處理函數
function handleRegistrationError(err) {
  console.error('Registration error:', err)
  
  // 特定錯誤訊息處理
  if (err.message.includes('Email already registered')) {
    error.value = 'This email is already registered. Please use a different email or try logging in.'
  } else if (err.message.includes('network') || err.message.includes('Network')) {
    error.value = 'Network error. Please check your connection and try again.'
  } else {
    error.value = err.message || 'Registration failed. Please try again.'
  }
}

// 清除表單（可選）
function clearForm() {
  name.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  phone.value = ''
  address.value = ''
  error.value = ''
}

// 快速填充測試數據（僅用於開發測試）
function fillTestData() {
  name.value = 'John Doe'
  email.value = 'john@example.com'
  password.value = '123456'
  confirmPassword.value = '123456'
  phone.value = '012-3456789'
  address.value = 'Kuala Lumpur, Malaysia'
}
</script>

<template>
  <div class="h-screen flex items-center justify-center relative bg-gray-50">
    <!-- 背景圖 + 模糊 -->
    <div
      class="absolute inset-0 bg-cover bg-center filter blur-sm"
      :style="{ backgroundImage: `url(${kltower})` }"
    ></div>

    <!-- 白色內容卡片 -->
    <div class="relative w-full max-w-md bg-white p-8 rounded-xl shadow-2xl mx-4">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img
          :src="logo"
          class="w-60 h-auto"
          alt="Visit Malaysia 2026 Logo"
        />
      </div>

      <!-- 標題 -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">
        Create Account
      </h2>
      <p class="text-gray-600 text-center mb-6">
        Join Visit Malaysia 2026 and explore amazing attractions!
      </p>

      <!-- 錯誤訊息 -->
      <div 
        v-if="error" 
        class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
      >
        <p class="text-red-600 text-sm flex items-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          {{ error }}
        </p>
      </div>

      <!-- 表單 -->
      <form @submit.prevent="signUp" class="space-y-4">
        <!-- 姓名 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            v-model="name"
            type="text"
            required
            placeholder="Enter your full name"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            :disabled="isLoading"
          >
        </div>

        <!-- 郵箱 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            :disabled="isLoading"
          >
        </div>

        <!-- 密碼 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="At least 6 characters"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pr-12"
              :disabled="isLoading"
            >
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              @click="showPassword = !showPassword"
              :disabled="isLoading"
            >
              <Eye v-if="!showPassword" :size="20" />
              <EyeOff v-else :size="20" />
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Must be at least 6 characters long
          </p>
        </div>

        <!-- 確認密碼 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password *
          </label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
              placeholder="Re-enter your password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pr-12"
              :disabled="isLoading"
            >
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              @click="showConfirmPassword = !showConfirmPassword"
              :disabled="isLoading"
            >
              <Eye v-if="!showConfirmPassword" :size="20" />
              <EyeOff v-else :size="20" />
            </button>
          </div>
        </div>

        <!-- 電話 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            v-model="phone"
            type="tel"
            placeholder="Optional"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            :disabled="isLoading"
          >
        </div>

        <!-- 地址 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            v-model="address"
            type="text"
            placeholder="Optional"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            :disabled="isLoading"
          >
        </div>

        <!-- 註冊按鈕 -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          :disabled="isLoading"
        >
          <div v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </div>
          <span v-else>Create Account</span>
        </button>

        <!-- 開發測試按鈕（僅開發環境顯示） -->
        <button
          v-if="process.env.NODE_ENV === 'development'"
          type="button"
          @click="fillTestData"
          class="w-full text-sm text-gray-500 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Fill Test Data (Dev Only)
        </button>
      </form>

      <!-- 已經有帳號 -->
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Already have an account?
          <router-link 
            to="/login" 
            class="text-amber-600 font-semibold hover:text-amber-700 hover:underline ml-1"
          >
            Sign In
          </router-link>
        </p>
      </div>

      <!-- 條款說明 -->
      <p class="mt-6 text-xs text-gray-500 text-center">
        By creating an account, you agree to our 
        <a href="#" class="text-amber-600 hover:underline">Terms of Service</a> 
        and 
        <a href="#" class="text-amber-600 hover:underline">Privacy Policy</a>
      </p>
    </div>

    <!-- 頁腳信息 -->
    <div class="absolute bottom-4 left-0 right-0 text-center">
      <p class="text-sm text-gray-600">
        © 2024 Visit Malaysia 2026. All rights reserved.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* 自定義滾動條樣式 */
.max-h-[90vh]::-webkit-scrollbar {
  width: 6px;
}

.max-h-[90vh]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.max-h-[90vh]::-webkit-scrollbar-thumb {
  background: #d97706;
  border-radius: 10px;
}

.max-h-[90vh]::-webkit-scrollbar-thumb:hover {
  background: #b45309;
}

/* 輸入框聚焦效果 */
input:focus {
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

/* 按鈕懸停效果 */
button:not(:disabled):hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* 響應式調整 */
@media (max-width: 640px) {
  .mx-4 {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
}
</style>