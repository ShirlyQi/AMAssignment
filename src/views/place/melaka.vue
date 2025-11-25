<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import melakaCity from '/src/assets/melaka-city.jpg'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
    
    <section class="max-w-6xl mx-auto py-14 px-6">
    <h1 class="text-4xl font-bold mb-8">MELAKA</h1>

    <div class="flex flex-col md:flex-row gap-8 items-center">
      <img :src="melakaCity" class="rounded-xl md:w-1/2" />

      <p class="md:w-1/2 leading-relaxed">
        Melaka, also known as Malacca, is a historic state in southwestern
        Peninsular Malaysia, famed as a UNESCO World Heritage Site for its
        colonial architecture and role as an ancient trading hub. It borders
        Negeri Sembilan, Johor, and the Strait of Malacca, covering 1,664 square
        kilometers with Malacca City as the capital and a population around
        1 million. The state preserves a multicultural legacy from Malay,
        Portuguese, Dutch, and British eras amid modern tourism.
      </p>
    </div>

    <div class="text-center mt-10">
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
