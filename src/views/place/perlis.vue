<script setup>
import perlisField from '/src/assets/perlis-field.jpg'

import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
  <section class="flex justify-center py-20 bg-gray-50">
    <div class="bg-white max-w-3xl p-10 rounded-2xl shadow">
      <h1 class="text-3xl font-bold text-center mb-6">PERLIS</h1>

      <img :src="perlisField" class="rounded-xl mb-6" />

      <p class="leading-relaxed text-center text-lg">
        Perlis is Malaysia's smallest state, located in the northwest near the
        Thai border, known for its vast paddy fields, karst hills, and role as a
        trade gateway. It features a flat coastal plain along the Strait of
        Malacca, rising to the Nakawan Range with Mount Perlis as its highest peak
        at 733 meters. The capital, Kangar, anchors its small population of around
        250,000 in a tropical monsoon climate with high humidity.
      </p>

      <div class="text-center">
        <router-link to="/cperlis"><button class="mt-10 px-10 py-3 bg-[#9C6B4E] text-white rounded-full">
        SUBMIT FORM
      </button></router-link>
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
