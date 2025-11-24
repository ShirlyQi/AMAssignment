<script setup>
import kltower from '../assets/kltower.jpeg';
import logo from '../assets/logo.png';
</script>

<template>
  <div class="h-screen flex">
    <!-- 左边图片，占 2/3 -->
    <div
      class="w-2/3 h-full bg-no-repeat bg-center bg-cover"
      :style="{ backgroundImage: `url(${kltower})` }"
    ></div>

    <!-- 右边，占 1/3 -->
    <div class="w-1/3 h-full flex flex-col items-center justify-center gap-10 bg-white">
      <!-- 放大 logo -->
      <img :src="logo" class="w-80" />


      <!-- 标题 -->
      <h1 class="text-3xl font-bold text-center" >
        WELCOME
        TO
        MALAYSIA
      </h1>

      <div class="flex gap-5">
        <router-link to="/login">
          <button class="px-6 py-2 bg-amber-700 text-white rounded">
            LOG IN
          </button>
        </router-link>

        <router-link to="/signup">
          <button class="px-6 py-2 bg-amber-700 text-white rounded">
            SIGN UP
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
