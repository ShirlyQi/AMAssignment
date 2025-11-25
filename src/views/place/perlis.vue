<script setup>
import perlisField from '/src/assets/perlis-field.jpg'
</script>

<template>
  <section class="flex justify-center py-20 bg-gray-50">
    <div class="bg-white max-w-3xl p-10 rounded-2xl shadow">
      <h1 class="text-3xl font-bold text-center mb-6">PERLIS</h1>

      <img :src="perlisField" class="rounded-xl mb-6" />

      <p class="leading-relaxed">
        Perlis is Malaysia's smallest state, located in the northwest near the
        Thai border, known for its vast paddy fields, karst hills, and role as a
        trade gateway. It features a flat coastal plain along the Strait of
        Malacca, rising to the Nakawan Range with Mount Perlis as its highest peak
        at 733 meters. The capital, Kangar, anchors its small population of around
        250,000 in a tropical monsoon climate with high humidity.
      </p>

      <div class="text-center">
        <button class="mt-10 px-10 py-3 bg-[#9C6B4E] text-white rounded-full">
          SUBMIT FORM
        </button>
      </div>
    </div>
  </section>
</template>
