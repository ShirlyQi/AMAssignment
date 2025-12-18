<template>
  <div>
    <NavBar />

    <div class="p-10">
      <h2 class="text-2xl font-bold mb-4">
        Welcome, you are logged in 🎉
      </h2>
      <p>This is a protected page.</p>
    </div>

    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/FooterBar.vue'
</script>
