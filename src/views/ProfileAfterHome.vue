<script setup>
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/FooterBar.vue'

// social media icons
import facebook from '../assets/fb.png'
import instagram from '../assets/ig.png'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Profile 数据
const profile = ref({
  name: 'Qi',
  email: 'qi@email.com',
  phone: '+60 12-345 6789',
  address: 'Kuala Lumpur, Malaysia',
  profilePicture: null
})

// 是否处于编辑状态
const isEditing = ref(false)

// 头像预览
const previewImage = ref(profile.value.profilePicture)

// 编辑按钮
function editProfile() {
  isEditing.value = true
}

// 保存按钮
function saveProfile() {
  profile.value.profilePicture = previewImage.value
  isEditing.value = false
}

// 上传头像
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 退出登录
function logout() {
  router.push('/login')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />

    <!-- 主内容 -->
    <section class="flex-1 pt-20 pb-15 px-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- 左侧：头像 + 按钮 -->
        <div class="bg-white rounded-2xl shadow p-8 text-center">
          <!-- 编辑头像 -->
          <div v-if="isEditing" class="mx-auto w-32 h-32 relative">
            <label class="cursor-pointer w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-dashed border-gray-300">
              <input type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
              <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover" />
              <span v-else class="text-gray-400 text-sm">Upload</span>
            </label>
          </div>

          <!-- 非编辑头像 -->
          <img v-else-if="profile.profilePicture" :src="profile.profilePicture" class="w-32 h-32 rounded-full mx-auto object-cover border" />
          <div v-else class="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-400">
            No Image
          </div>

          <!-- 编辑/显示区域 -->
          <div class="mt-6">
            <div v-if="isEditing" class="space-y-2">
              <input v-model="profile.name" placeholder="Full Name" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
              <input v-model="profile.email" placeholder="Email" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
              <input v-model="profile.phone" placeholder="Phone" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
              <input v-model="profile.address" placeholder="Address" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
              <button class="mt-4 w-full bg-amber-700 text-white py-3 rounded hover:bg-amber-800 transition" @click="saveProfile">Save</button>
            </div>
            <div v-else>
              <h3 class="text-xl font-semibold">{{ profile.name }}</h3>
              <p class="text-gray-500 text-sm">{{ profile.email }}</p>
              <button class="mt-6 w-full bg-amber-700 text-white py-3 rounded hover:bg-amber-800 transition" @click="editProfile">Edit Profile</button>
            </div>

            <button class="mt-3 w-full bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400 transition" @click="logout">
              Logout
            </button>
          </div>
        </div>

        <!-- 右侧：个人信息 -->
        <div class="md:col-span-2 bg-white rounded-2xl shadow p-10">
          <h2 class="text-2xl font-bold mb-8">Personal Information</h2>
          <div class="space-y-6">
            <div>
              <p class="text-gray-500 text-sm">Full Name</p>
              <p v-if="!isEditing" class="font-medium">{{ profile.name }}</p>
              <input v-else v-model="profile.name" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
            </div>
            <div>
              <p class="text-gray-500 text-sm">Email</p>
              <p v-if="!isEditing" class="font-medium">{{ profile.email }}</p>
              <input v-else v-model="profile.email" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
            </div>
            <div>
              <p class="text-gray-500 text-sm">Phone</p>
              <p v-if="!isEditing" class="font-medium">{{ profile.phone }}</p>
              <input v-else v-model="profile.phone" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
            </div>
            <div>
              <p class="text-gray-500 text-sm">Address</p>
              <p v-if="!isEditing" class="font-medium">{{ profile.address }}</p>
              <input v-else v-model="profile.address" class="w-full border p-2 rounded focus:ring-2 focus:ring-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <FooterBar />

    <!-- 左侧社交图标 -->
    <div class="fixed top-1/2 left-4 transform -translate-y-1/2 flex flex-col space-y-2 z-50 opacity-70">
      <a href="https://www.facebook.com/share/1BuieJf2kt/">
        <img :src="facebook" alt="Facebook" class="w-12 h-12"/>
      </a>
      <a href="https://www.instagram.com/visitmalaysiaofficial?igsh=MWt3NGMzeTN5N255eg==">
        <img :src="instagram" alt="Instagram" class="w-12 h-12"/>
      </a>
    </div>
  </div>
</template>
