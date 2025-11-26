<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Camera } from 'lucide-vue-next'
import logo from '../assets/logo.png'
import kltower from '../assets/kltower.jpeg'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const address = ref('')
const profilePicture = ref(null)
const previewImage = ref(null)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref('')

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    profilePicture.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}


function signUp() {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  router.push({
    name: 'Profile',
    state: {
      name: name.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      profilePicture: previewImage.value
    }
  })
}
</script>

<template>

  <div class="h-screen flex items-center justify-center relative">
    <div class="absolute inset-0 bg-cover bg-center filter blur-sm" :style="{ backgroundImage: `url(${kltower})` }"></div>

    <div class="relative w-96 bg-white p-8 rounded shadow-lg overflow-auto max-h-[90vh]">
      <img :src="logo" class="w-60 mx-auto mb-6" />
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <p v-if="error" class="text-red-600 text-sm mb-4 text-center">{{ error }}</p>

      <!-- Profile Picture 上传 -->
      <div class="flex flex-col items-center mb-4">
        <label for="profile-upload" class="cursor-pointer flex flex-col items-center justify-center w-24 h-24 bg-gray-100 rounded-full overflow-hidden relative border border-dashed border-gray-300 hover:border-amber-600">
          <input id="profile-upload" type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
          <Camera class="absolute text-gray-400 w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover" />
        </label>
        <span class="text-xs text-gray-500 mt-1">Profile Picture (optional)</span>
      </div>

      
      <input v-model="name" type="text" placeholder="Full Name" class="w-full border p-2 mb-3 rounded"/>
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 mb-3 rounded"/>
      
      <div class="relative mb-3">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full border p-2 pr-10 rounded"/>
        <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2" @click="showPassword = !showPassword">
          <Eye v-if="!showPassword" :size="20"/>
          <EyeOff v-else :size="20"/>
        </button>
      </div>

      <div class="relative mb-3">
        <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm Password" class="w-full border p-2 pr-10 rounded"/>
        <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2" @click="showConfirmPassword = !showConfirmPassword">
          <Eye v-if="!showConfirmPassword" :size="20"/>
          <EyeOff v-else :size="20"/>
        </button>
      </div>

      <input v-model="phone" type="text" placeholder="Phone Number" class="w-full border p-2 mb-3 rounded"/>
      <input v-model="address" type="text" placeholder="Address" class="w-full border p-2 mb-4 rounded"/>

      <div class="text-right mb-6 text-sm">
        <router-link to="/login" class="text-amber-700 hover:underline">Already have an account?</router-link>
      </div>

      <button class="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition" @click="signUp">Sign Up</button>
    </div>
  </div>
</template>
