<script setup>
import sarawakHero from '/src/assets/sarawak-hero.jpg'
import sarawakNature from '/src/assets/sarawak-nature.png'

import NavBar from '/src/components/NavBar.vue'
import FooterBar from '/src/components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
  <section class="max-w-7xl mx-auto py-14">
    <img :src="sarawakHero" class="w-full h-[60vh] object-cover rounded-2xl mb-12" />

    <h1 class="text-4xl font-extrabold text-center mb-8">SARAWAK</h1>

    <div class="grid md:grid-cols-2 gap-10 px-6">
      <p class="leading-relaxed text-lg">
        Sarawak is Malaysia's largest state, occupying the northwestern part of
        Borneo island, renowned for its vast rainforests, diverse ethnic cultures,
        and natural wonders like Gunung Mulu National Park. It shares borders with
        Sabah, Brunei, and Indonesia's Kalimantan, featuring a tropical climate
        and extensive river systems. The capital, Kuching, serves as its economic
        and cultural hub.
      </p>

      <img :src="sarawakNature" class="rounded-xl" />
    </div>

    <div class="text-center">
      <button class="mt-12 px-10 py-3 bg-[#9C6B4E] text-white rounded-full">
        SUBMIT FORM
      </button>
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
