<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import penangIsland from '/src/assets/penang-island.jpeg'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />

  <section class="max-w-6xl mx-auto py-14 px-6 grid md:grid-cols-2 gap-10 items-center">
    <img :src="penangIsland" class="rounded-xl" />

    <div>
      <h1 class="text-4xl font-bold mb-6">PENANG</h1>
      <p class="leading-relaxed">
        Penang, often called the "Pearl of the Orient," is a Malaysian state on
        the northwest coast of Peninsular Malaysia, famed for its culinary scene,
        colonial heritage, and UNESCO-listed George Town. It comprises Penang Island
        (home to the capital George Town) and the mainland Seberang Perai,
        connected by bridges, with a population of about 1.74 million and high
        urbanization at 92.5%. The state thrives as a multicultural hub blending
        Chinese, Malay, Indian, and Peranakan influences amid tropical island vibes.
      </p>

      <div class="mt-10">
        <button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full">
          SUBMIT FORM
        </button>
      </div>
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

