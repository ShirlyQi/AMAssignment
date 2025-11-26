<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import terengganuBeach from '/src/assets/terengganu-beach.png'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />

  <section class="max-w-6xl mx-auto py-14 px-6 text-center">
    <h1 class="text-4xl font-bold mb-6">TERENGGANU</h1>

    <img :src="terengganuBeach" class="rounded-2xl mx-auto mb-8" />

    <p class="leading-relaxed max-w-3xl mx-auto text-lg">
      Terengganu is a state on Malaysia's east coast in Peninsular Malaysia,
      celebrated for its pristine beaches, tropical islands like Perhentian and
      Redang, and conservative Malay-Muslim culture. Covering 13,035 square
      kilometers with a population over 1.2 million, it borders Kelantan, Pahang,
      and the South China Sea, with Kuala Terengganu as the capital. The state
      features a homogeneous ethnic Malay majority (95%), distinct Terengganu
      dialect, and strong Islamic traditions.
    </p>

    <div class="mt-10">
      <router-link to="/cterengganu"><button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full">
        SUBMIT FORM
      </button></router-link>
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

