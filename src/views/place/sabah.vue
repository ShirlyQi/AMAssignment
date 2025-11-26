<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import seaVillage from '/src/assets/sabah-sea.jpg'
import kinabaluPeak from '/src/assets/sabah-peak.jpg'
import kinabaluView from '/src/assets/sabah-mountain.jpg'
import sabahCulture from '/src/assets/sabah-culture.jpg'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'
</script>

<template>
  <div class="flex flex-col min-h-screen">
   
    <NavBar />

   
    <main class="flex-grow px-6 py-14 bg-gray-50">
      <h1 class="text-4xl font-extrabold text-center mb-8">SABAH</h1>

      <p class="text-center text-lg max-w-4xl mx-auto mb-12 leading-relaxed text-gray-700">
        Sabah is a state in Malaysia located on the northern part of Borneo island,
        known for its stunning natural diversity and biodiversity hotspots.
        It features attractions like Mount Kinabalu, Southeast Asia's highest peak,
        and world-class dive sites such as Sipadan Island. The state blends rich
        cultural heritage from over 30 ethnic groups with adventure tourism and
        pristine beaches.
      </p>

      
      <div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
      
        <div class="col-span-2 overflow-hidden rounded-2xl">
          <img :src="seaVillage" class="w-full h-96 object-cover" alt="Sea Village" />
        </div>

        <div class="overflow-hidden rounded-2xl">
          <img :src="kinabaluPeak" class="w-full h-48 object-cover" alt="Kinabalu Peak" />
        </div>
        <div class="overflow-hidden rounded-2xl">
          <img :src="kinabaluView" class="w-full h-48 object-cover" alt="Kinabalu View" />
        </div>

      
        <div class="col-span-2 overflow-hidden rounded-2xl">
          <img :src="sabahCulture" class="w-full h-96 object-cover" alt="Sabah Culture" />
        </div>
      </div>


      <div class="flex justify-center mt-14">
        <router-link to="/csabah"><button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full hover:bg-[#b27d65] transition-colors">
          SUBMIT FORM 
        </button></router-link>
      </div>
    </main>

    <FooterBar />

 
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
