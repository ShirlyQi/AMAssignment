<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import nsTradition from '/src/assets/ns-tradition.jpg'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
    
  <section class="max-w-6xl mx-auto py-14 px-8 grid md:grid-cols-3 gap-8">
    <div class="md:col-span-2">
      <h1 class="text-4xl font-bold mb-14">NEGERI SEMBILAN</h1>
      <p class="leading-relaxed text-lg">
        Negeri Sembilan is a state on the western coast of Peninsular Malaysia,
        known for its unique Minangkabau heritage, distinctive buffalo-horn roofed
        architecture, and matrilineal Adat Perpatih customs brought by migrants
        from Sumatra. It borders Selangor, Pahang, Malacca, and Johor, covering
        6,658 square kilometers with Seremban as the capital and a population
        around 1.1 million. The state uniquely operates a coregency system where
        the Yang di-Pertuan Besar shares power with four Undangs and the Tunku
        Besar of Tampin.
      </p>
    </div>

    <img :src="nsTradition" class="w-full h-full object-cover rounded-xl " />
    
    <div class="md:col-span-3 text-center mt-10">
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

