<script setup>
import NavBar from '../../components/NavBar.vue'
import FooterBar from '../../components/FooterBar.vue'

import facebook from '/src/assets/fb.png'
import instagram from '/src/assets/ig.png'

import kedahRice from '/src/assets/kedah-rice.jpg'
import kedahLangkawi from '/src/assets/kedah-langkawi.jpg'
</script>

<template>
  <div class="bg-gray-50 min-h-screen flex flex-col relative">
    <NavBar />
    
    <section class="max-w-5xl mx-auto py-14 px-6 space-y-10">
    <h1 class="text-4xl font-bold text-center">KEDAH</h1>

    <p class="leading-relaxed">
      Kedah, known as the "Rice Bowl of Malaysia," is a state in northwestern Peninsular Malaysia, 
      celebrated for its vast paddy fields, the idyllic Langkawi archipelago, and ancient historical roots. 
      It borders Perlis to the north, Thailand to the northeast, Penang to the southwest, 
      and Perak to the south, with Alor Setar as its capital and a population of about 2.18 million. 
    </p>

    <img :src="kedahRice" class="rounded-xl" />

    <p class="leading-relaxed">
      The state blends agricultural heartlands with mountainous interiors and
      coastal islands, supporting rice production that feeds much of the nation.
    </p>

    <img :src="kedahLangkawi" class="rounded-xl" />

    <div class="text-center">
      <router-link to="/ckedah"><button class="mt-12 px-12 py-3 bg-[#9C6B4E] text-white rounded-full">
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
