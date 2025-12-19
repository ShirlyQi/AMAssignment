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


<section class="bg-gray-50 py-16">
    <!-- WHAT WE CAN DO -->
      <div class="grid grid-cols-2 gap-10 items-center">
        <h2 class="text-4xl font-black">
          WHAT <span class="text-amber-700">WE CAN DO</span>
        </h2>

        <p class="text-gray-600">
          Indulge in an awe-inspiring adventure of a lifetime. Enjoy 
fun times with your family, explore the wilderness and 
taste the mouth-watering cuisine of Malaysia.
        </p>
      </div>
      </section>
    
      <div class="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        <img :src="cityImg" class="rounded-lg" />
        <img :src="foodImg" class="rounded-lg" />
        <img :src="natureImg" class="rounded-lg" />
        <img :src="cultureImg" class="rounded-lg" />
        <img :src="islandImg" class="rounded-lg" />
      </div>
    </section>

    <FooterBar />
  </div>
</template>
