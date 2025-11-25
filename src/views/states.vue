<script setup>
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/FooterBar.vue'

// states
import sabahImg from '../assets/sabah.jpg'
import kedahImg from '../assets/kedah.jpg'
import klImg from '../assets/kl.jpg'
import sarawakImg from '../assets/sarawak.jpg'
import perakImg from '../assets/perak.jpg'
import selangorImg from '../assets/selangor.jpg'
import perlisImg from '../assets/perlis.jpg'
import johorImg from '../assets/johor.jpg'
import terengganuImg from '../assets/terengganu.jpg'
import kelantanImg from '../assets/kelantan.jpg'
import nsImg from '../assets/ns.jpg'
import penangImg from '../assets/penang_2.jpg'
import melakaImg from '../assets/melaka_2.jpg'


// social media icons
import facebook from '../assets/fb.png'
import instagram from '../assets/ig.png'
</script>


<template>
  <div>
    <NavBar />

    <!-- STATE IN MALAYSIA -->
    <section class="py-16">
      <h2 class="text-4xl font-black text-center mb-12">
        STATE IN MALAYSIA
      </h2>

      <div class="grid grid-cols-5 gap-10 max-w-6xl mx-auto text-center">
       <router-link to="/sabah" class="nav-item block text-center">
  <div>
    <img
      :src="sabahImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>SABAH</p>
  </div>
</router-link>

        <router-link to="/kedah" class="nav-item block text-center">
  <div>
    <img
      :src="kedahImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>KEDAH</p>
  </div>
</router-link>
        <router-link to="/kl" class="nav-item block text-center">
  <div>
    <img
      :src="klImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>KL</p>
  </div>
</router-link>
        <router-link to="/sarawak" class="nav-item block text-center">
  <div>
    <img
      :src="sarawakImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>SARAWAK</p>
  </div>
</router-link>
      <router-link to="/perak" class="nav-item block text-center">
  <div>
    <img
      :src="perakImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>PERAK</p>
  </div>
</router-link>
        <router-link to="/selangor" class="nav-item block text-center">
  <div>
    <img
      :src="selangorImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>SELANGOR</p>
  </div>
</router-link>
        <router-link to="/perlis" class="nav-item block text-center">
  <div>
    <img
      :src="perlisImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>PERLIS</p>
  </div>
</router-link>
        <router-link to="/johor" class="nav-item block text-center">
  <div>
    <img
      :src="johorImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>JOHOR</p>
  </div>
</router-link>
       <router-link to="/terengganu" class="nav-item block text-center">
  <div>
    <img
      :src="terengganuImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>TERENGGANU</p>
  </div>
</router-link>
        <router-link to="/kelantan" class="nav-item block text-center">
  <div>
    <img
      :src="kelantanImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>KELANTAN</p>
  </div>
</router-link>
        <router-link to="/n9" class="nav-item block text-center">
  <div>
    <img
      :src="nsImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>NEGERI SEMBILAN</p>
  </div>
</router-link>
<router-link to="/penang" class="nav-item block text-center">
  <div>
    <img
      :src="penangImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>Penang</p>
  </div>
</router-link>
<router-link to="/melaka" class="nav-item block text-center">
  <div>
    <img
      :src="melakaImg"
      class="w-24 h-24 rounded-full mx-auto cursor-pointer"
    />
    <p>MELAKA</p>
  </div>
</router-link>

      </div>
      
      
    </section>

    <FooterBar />
    <div class="fixed top-1/2 left-4 transform -translate-y-1/2 flex flex-col space-y-2 z-50 opacity-70">
      
  <!-- Facebook -->
  <a href="https://www.facebook.com/share/1BuieJf2kt/">
    <img
      :src="facebook"
      alt="Facebook"
      class="w-12 h-12"
      @error="elementPath = '/images/placeholder.jpg'"
    />
  </a>
  <!-- Instagram -->
  <a href="https://www.instagram.com/visitmalaysiaofficial?igsh=MWt3NGMzeTN5N255eg==">
    <img
      :src="instagram"
      alt="Instagram"
      class="w-12 h-12"
      @error="elementPath = '/images/placeholder.jpg'"
    />
  </a>
</div>
  </div>
</template>
