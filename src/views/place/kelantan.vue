<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import kelantanRiver from '/src/assets/kelantan-river.jpg'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
    
    <section class="max-w-4xl mx-auto py-14 px-6 border-l-4 border-gray-400 pl-8">
    <h1 class="text-4xl font-bold mb-6">KELANTAN</h1>

    <p class="leading-relaxed mb-6 text-lg">
      Kelantan is a state in northeastern Peninsular Malaysia, renowned for
      its conservative Malay culture, traditional arts like wayang kulit shadow
      puppetry, and scenic paddy fields along the Kelantan River. Bordered by
      Thailand to the north, Terengganu to the southeast, Pahang to the south,
      and Perak to the west, it has Kota Bharu as its capital and a population
      of about 1.9 million.
    </p>

    <img :src="kelantanRiver" class="rounded-xl mb-8" />

    <div class="text-center">
      <button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full">
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
