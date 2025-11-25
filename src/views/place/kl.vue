<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import kltower from '/src/assets/kltower.jpeg'
import klStreet from '/src/assets/kl-street.jpg'
import klFood from '/src/assets/kl-food.jpg'

</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />

    <section class="max-w-7xl mx-auto py-14 px-6">
    <h1 class="text-5xl font-extrabold mb-10">KUALA LUMPUR</h1>

    <div class="grid md:grid-cols-3 gap-6 items-stretch">
  <!-- 第一张图（高度 = 右边全部） -->
  <div class="md:col-span-2 overflow-hidden rounded-xl">
    <img
      :src="kltower"
      class="w-full h-full object-cover"
      alt="KL Tower"
    />
  </div>

  <!-- 右边：文字 + 第二张图 -->
  <div class="flex flex-col space-y-4 h-full">
    <p class="leading-relaxed text-lg">
      Kuala Lumpur, commonly known as KL, is Malaysia's capital and a bustling
      federal territory renowned for its iconic skyline, multicultural
      vibrancy, and role as the nation's economic powerhouse. Situated at the
      confluence of the Klang and Gombak rivers, it spans 243 square kilometers
      with a population exceeding 2 million in the city proper and 8.8 million
      in the greater Klang Valley. The city blends colonial history, modern
      skyscrapers like the Petronas Twin Towers, and diverse neighborhoods from
      Chinatown to Little India.
    </p>

    <div class="overflow-hidden rounded-xl pt-10">
    <img
      :src="klFood"
      class="w-full h-100 object-cover"
      alt="KL Food"
    />
  </div>

  <!-- 第二张图 -->
  <div class="overflow-hidden rounded-xl pt-10">
    <img
      :src="klStreet"
      class="w-full h-100 object-cover"
      alt="KL Street"
    />
    </div>
  </div>
</div>

    <div class="text-center">
      <button class="mt-12 px-12 py-3 bg-[#9C6B4E] text-white rounded-full">
        SUBMIT FORM
      </button>
    </div>
  </section>

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

