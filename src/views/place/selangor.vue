<script setup>
import selangorCity from '/src/assets/selangor-city.jpg'
import selangorTech from '/src/assets/selangor-tech.jpg'
import selangorRiver from '/src/assets/selangor-river.jpg'

import NavBar from '/src/components/NavBar.vue'
import FooterBar from '/src/components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'
</script>

<template>

  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />

  <section class="max-w-7xl mx-auto py-14 px-6">
    <h1 class="text-4xl font-bold mb-8 text-center">SELANGOR</h1>

    <p class="mb-10 leading-relaxed text-lg">
      Selangor is Malaysia's most populous and economically dominant state,
      located on the west coast of Peninsular Malaysia, surrounding the federal
      territories of Kuala Lumpur and Putrajaya. Known as Darul Ehsan, it
      features the urbanized Klang Valley, which drives national growth through
      industry, services, and tech hubs. Shah Alam serves as the state capital,
      while Klang is the royal capital.
    </p>

    <div class="flex gap-6 overflow-x-auto pb-4">
      <img :src="selangorCity" class="w-96 rounded-xl flex-shrink-0" />
      <img :src="selangorTech" class="w-96 rounded-xl flex-shrink-0" />
      <img :src="selangorRiver" class="w-96 rounded-xl flex-shrink-0" />
    </div>

    <div class="text-center">
      <router-link to="/cselangor"><button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full hover:bg-[#b27d65] transition-colors">
          SUBMIT FORM 
        </button></router-link>
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
