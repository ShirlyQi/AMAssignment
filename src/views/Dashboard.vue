<script setup>
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/FooterBar.vue'

// hero
import heroVideo from '../assets/video.mp4'

// destination
import penangImg from '../assets/penang.jpg'
import melakaImg from '../assets/melaka.jpg'
import langkawiImg from '../assets/langkawi.jpg'

// what we can do
import cityImg from '../assets/city.jpg'
import foodImg from '../assets/food.jpg'
import natureImg from '../assets/nature.jpg'
import cultureImg from '../assets/culture.jpg'
import islandImg from '../assets/island.jpg'

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
</script>

<template>
  <div>
    <NavBar />

    <!-- HERO VIDEO -->
    <section class="relative">
      <video
        :src="heroVideo"
        autoplay
        muted
        loop
        class="w-full h-[500px] object-cover"
      />
    </section>

    <!-- UNIQUE DESTINATION -->
    <section class="max-w-6xl mx-auto py-16">
      <div class="grid grid-cols-2 gap-10 items-center">
        <h2 class="text-4xl font-black">
          UNIQUE <span class="text-amber-700">DESTINATION</span>
        </h2>

        <p class="text-gray-600">
          Travel around to experience the remarkable treasures and
          hidden gems in Malaysia. Each state offers a unique
          Malaysian experience for all.
        </p>
      </div>

      <div class="grid grid-cols-3 gap-6 mt-10">
        <img :src="penangImg" class="rounded-lg" />
        <img :src="melakaImg" class="rounded-lg" />
        <img :src="langkawiImg" class="rounded-lg" />
      </div>
    </section>

    <!-- WHAT WE CAN DO -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        <img :src="cityImg" class="rounded-lg" />
        <img :src="foodImg" class="rounded-lg" />
        <img :src="natureImg" class="rounded-lg" />
        <img :src="cultureImg" class="rounded-lg" />
        <img :src="islandImg" class="rounded-lg" />
      </div>
    </section>

    <!-- STATE IN MALAYSIA -->
    <section class="py-16">
      <h2 class="text-4xl font-black text-center mb-12">
        STATE IN MALAYSIA
      </h2>

      <div class="grid grid-cols-5 gap-10 max-w-6xl mx-auto text-center">
        <div>
          <img :src="sabahImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>SABAH</p>
        </div>
        <div>
          <img :src="kedahImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>KEDAH</p>
        </div>
        <div>
          <img :src="klImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>KUALA LUMPUR</p>
        </div>
        <div>
          <img :src="sarawakImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>SARAWAK</p>
        </div>
        <div>
          <img :src="perakImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>PERAK</p>
        </div>
        <div>
          <img :src="selangorImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>SELANGOR</p>
        </div>
        <div>
          <img :src="perlisImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>PERLIS</p>
        </div>
        <div>
          <img :src="johorImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>JOHOR</p>
        </div>
        <div>
          <img :src="terengganuImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>TERENGGANU</p>
        </div>
        <div>
          <img :src="kelantanImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>KELANTAN</p>
        </div>
        <div>
          <img :src="nsImg" class="w-24 h-24 rounded-full mx-auto" />
          <p>NEGERI SEMBILAN</p>
        </div>
      </div>
    </section>

    <FooterBar />
  </div>
</template>
