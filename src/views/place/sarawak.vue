<script setup>
import sarawakHero from '/src/assets/sarawak-hero.jpg'
import sarawakNature from '/src/assets/sarawak-nature.png'

</script>

<template>
  <section class="max-w-7xl mx-auto py-14">
    <img :src="sarawakHero" class="w-full h-[60vh] object-cover rounded-2xl mb-12" />

    <h1 class="text-4xl font-extrabold text-center mb-8">SABAH</h1>

    <div class="grid md:grid-cols-2 gap-10 px-6">
      <p class="leading-relaxed">
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
</template>
