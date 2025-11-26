<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import perak1 from '/src/assets/perak1.jpg'
import perak2 from '/src/assets/perak2.png'
import perak3 from '/src/assets/perak3.png'
import perak4 from '/src/assets/perak4.jpg'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
    
    <section class="max-w-7xl mx-auto py-14 px-6">
    <h1 class="text-4xl font-bold text-center mb-8">PERAK</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <img
    :src="perak1"
    class="w-full h-48 md:h-56 rounded-xl object-cover"
    alt="Perak 1"
  />
  <img
    :src="perak2"
    class="w-full h-48 md:h-56 rounded-xl object-cover"
    alt="Perak 2"
  />
  <img
    :src="perak3"
    class="w-full h-48 md:h-56 rounded-xl object-cover"
    alt="Perak 3"
  />
  <img
    :src="perak4"
    class="w-full h-48 md:h-56 rounded-xl object-cover"
    alt="Perak 4"
  />
</div>

    <p class="leading-relaxed text-lg">
      Perak is a state on the west coast of Peninsular Malaysia, historically
      renowned for tin mining and now a blend of industrial growth, heritage
      sites, and natural attractions like the Cameron Highlands. It borders
      Kedah, Penang, Kelantan, Pahang, Selangor, and Thailand, with Ipoh as the
      capital and Kuala Kangsar as the royal capital, hosting a population of
      about 2 million. The state features diverse landscapes from coastal plains
      to rugged mountains, supporting a tropical climate with significant rainfall.
    </p>

    <div class="text-center mt-10">
      <router-link to="/cperak"><button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full">
        SUBMIT FORM
      </button></router-link>
    </div>
  </section>

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