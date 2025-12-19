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
