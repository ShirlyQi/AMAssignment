<script setup>
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/FooterBar.vue'

// social media icons
import facebook from '../assets/fb.png'
import instagram from '../assets/ig.png'

</script>

<template>
  <div class="about-container">
    <NavBar />
    <h1>About Malaysia</h1>
    <p>
      Malaysia is a Southeast Asian country located on a strategic sea lane that exposes it to global trade and various cultures. It consists of two main regions: Peninsular Malaysia and East Malaysia on the island of Borneo. The country is known for its diverse culture, tropical rainforests, and beautiful beaches.
    </p>
    <h2>Geography</h2>
    <p>
      Malaysia is divided into two main regions by the South China Sea. Peninsular Malaysia shares a border with Thailand to the north and Singapore to the south, while East Malaysia shares borders with Indonesia and Brunei. The country has a varied landscape that includes mountains, rainforests, and coastal areas.
    </p>
    <h2>Culture</h2>
    <p>
      Malaysia is a multicultural nation with a rich heritage influenced by Malay, Chinese, Indian, and indigenous cultures. This diversity is reflected in its festivals, cuisine, languages, and traditions. Major religions practiced in Malaysia include Islam, Buddhism, Christianity, and Hinduism.
    </p>
    <h2>Economy</h2>
    <p>
      Malaysia has a mixed economy that is driven by manufacturing, services, and agriculture. It is one of the world's largest producers of palm oil and rubber. The country has also developed a strong electronics sector and is a significant player in global trade.
    </p>
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
