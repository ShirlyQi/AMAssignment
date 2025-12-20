<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import seaVillage from '/src/assets/sabah-sea.jpg'
import kinabaluPeak from '/src/assets/sabah-peak.jpg'
import kinabaluView from '/src/assets/sabah-mountain.jpg'
import sabahCulture from '/src/assets/sabah-culture.jpg'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- 导航栏 -->
    <NavBar />

    <!-- 主内容 -->
    <main class="flex-grow px-6 py-14 bg-gray-50">
      <h1 class="text-4xl font-extrabold text-center mb-8">SABAH</h1>

      <p class="text-center max-w-4xl mx-auto mb-12 leading-relaxed text-gray-700">
        Sabah is a state in Malaysia located on the northern part of Borneo island,
        known for its stunning natural diversity and biodiversity hotspots.
        It features attractions like Mount Kinabalu, Southeast Asia's highest peak,
        and world-class dive sites such as Sipadan Island. The state blends rich
        cultural heritage from over 30 ethnic groups with adventure tourism and
        pristine beaches.
      </p>

      <!-- 九宫格图片布局 -->
      <div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
        <!-- 第一张大图占两列 -->
        <div class="col-span-2 overflow-hidden rounded-2xl">
          <img :src="seaVillage" class="w-full h-96 object-cover" alt="Sea Village" />
        </div>

        <!-- 两张小图 -->
        <div class="overflow-hidden rounded-2xl">
          <img :src="kinabaluPeak" class="w-full h-48 object-cover" alt="Kinabalu Peak" />
        </div>
        <div class="overflow-hidden rounded-2xl">
          <img :src="kinabaluView" class="w-full h-48 object-cover" alt="Kinabalu View" />
        </div>

        <!-- 第四张大图占两列 -->
        <div class="col-span-2 overflow-hidden rounded-2xl">
          <img :src="sabahCulture" class="w-full h-96 object-cover" alt="Sabah Culture" />
        </div>
      </div>

      <!-- Submit 按钮 -->
      <div class="flex justify-center mt-14">
        <router-link to="/csabah"><button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full hover:bg-[#b27d65] transition-colors">
          SUBMIT FORM 
        </button></router-link>
      </div>
    </main>

    <!-- 页脚 -->
    <FooterBar />
  </div>
</template>

<style scoped>
/* 可根据需要微调 */
</style>
