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

// social media icons
import facebook from '../assets/fb.png'
import instagram from '../assets/ig.png'

</script>

<template>
  <div>
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
<section class="bg-gray-50 pt-20 pb-5">
 
  <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-12">

    <div class="grid grid-cols-2 gap-10 items-center  mb-10">
      <h2 class="text-4xl font-black">
        UNIQUE <span class="text-amber-700">DESTINATION</span>
      </h2>

      <p class="text-gray-600">
        Travel around to experience the remarkable treasures and
        hidden gems in Malaysia. Each state offers a unique
        Malaysian experience for all.
      </p>
    </div>

    <div class="grid grid-cols-3 gap-6 mt-15">
      <img :src="penangImg" class="rounded-lg" />
      <img :src="melakaImg" class="rounded-lg" />
      <img :src="langkawiImg" class="rounded-lg" />
    </div>

  </div>
</section>


<!-- WHAT WE CAN DO  -->
<section class="bg-gray-50 pt-10 pb-5">
  
  <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-12">

    <div class="grid grid-cols-2 gap-10 items-center mb-10">
      <h2 class="text-4xl font-black">
        WHAT <span class="text-amber-700">WE CAN DO</span>
      </h2>

      <p class="text-gray-600">
        Indulge in an awe-inspiring adventure of a lifetime. Enjoy
        fun times with your family, explore the wilderness and
        taste the mouth-watering cuisine of Malaysia.
      </p>
    </div>

<div class="flex justify-center items-center w-full max-w-5xl mx-auto gap-6">
    <!-- 左列 -->
    <div class="flex flex-col justify-center gap-6">
      <img :src="cultureImg" class="rounded-2xl aspect-square object-cover" />
      <img :src="natureImg" class="rounded-2xl aspect-square object-cover" />
    </div>

    <!-- 中间大图 -->
    <img
      :src="foodImg"
      class="rounded-2xl aspect-square object-cover"
    />

    <!-- 右列 -->
    <div class="flex flex-col justify-center gap-6">
      <img :src="cityImg" class="rounded-2xl aspect-square object-cover" />
      <img :src="islandImg" class="rounded-2xl aspect-square object-cover" />
    </div>
  </div>

  </div>
</section>


    <FooterBar />
    
  </div>
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
