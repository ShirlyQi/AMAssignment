<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import johorCoast from '/src/assets/johor-coast.jpeg'

</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
    
    <section class=" py-14 px-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-5xl font-bold mb-8 text-center">JOHOR</h1>

      <p class="leading-relaxed max-w-4xl mx-auto mb-10 text-lg">
        Johor is Malaysia's southernmost state in Peninsular Malaysia, strategically
        positioned at the tip of Asia adjacent to Singapore, known for its industrial
        prowess, pristine beaches, and lush rainforests. Covering nearly 19,166
        square kilometers with a 400-km coastline along the Strait of Malacca,
        South China Sea, and Straits of Johor, it features Johor Bahru as the capital
        and a population exceeding 4 million. The state balances urban development
        with natural assets like Endau-Rompin National Park and Ramsar wetlands.
      </p>

      <img :src="johorCoast" class="rounded-xl mb-10" />

      <div class="text-center">
        <router-link to="/cjohor"><button class="px-12 py-3 bg-[#9C6B4E] text-white rounded-full">
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


