<script setup>
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/FooterBar.vue'

// social media icons
import facebook from '../assets/fb.png'
import instagram from '../assets/ig.png'

// page images
import heroImg from '../assets/hero.jpg'
import geoImg from '../assets/geography.jpg'
import climateImg from '../assets/climate.jpg'
import historyImg from '../assets/history.jpg'
import cultureImg from '../assets/culture_2.jpg'

const placeholder = '/images/placeholder.jpg'
</script>

<template>
  <div>
    <NavBar />

    <!-- Hero Banner -->
    <section
      class="hero"
      :style="{ backgroundImage: `url(${heroImg})` }"
    >
      <div class="hero-overlay">
        <h1>About <span>Malaysia</span></h1>
      </div>
    </section>

    <!-- Main Content -->
    <main class="editorial">

      <!-- Geography -->
      <section class="block">
        <h2>Geography</h2>
        <p>
          Located between two and seven degrees north of the Equator, Malaysia
          is formed by 13 states and three Federal Territories. Sabah and Sarawak
          are located in East Malaysia, while the rest are in Peninsular Malaysia.
        </p>

        <div class="image-right">
          <img
            :src="geoImg"
            alt="Geography"
            @error="e => e.target.src = placeholder"
          />
        </div>
      </section>

      <!-- Area and Climate -->
      <section class="block">
        <h2>Area and Climate</h2>
        <p>
          With an area of approximately 329,847 square kilometres and a warm
          tropical climate ranging from 23°C to 32°C, Malaysia offers an
          exciting range of tourism products throughout the year.
        </p>

        <div class="image-center">
          <img
            :src="climateImg"
            alt="Climate"
            @error="e => e.target.src = placeholder"
          />
        </div>
      </section>

      <!-- History and Economy -->
      <section class="block">
        <h2>History and Economy</h2>
        <p>
          The history of Malaysia began with the Melaka Sultanate in the 15th
          century. Independence was achieved in 1957, and Malaysia was formed
          in 1963 with the inclusion of Sabah and Sarawak.
        </p>

        <div class="image-left">
          <img
            :src="historyImg"
            alt="History"
            @error="e => e.target.src = placeholder"
          />
        </div>

        <p class="sub-text">
          Manufacturing forms the backbone of the economy, while tourism and
          primary commodities such as palm oil and petroleum remain key
          contributors.
        </p>
      </section>

      <!-- People and Culture -->
      <section class="block">
        <h2>People and Culture</h2>
        <p>
          Malaysia is a multicultural society shaped by Malays, Chinese,
          Indians, and indigenous communities, reflecting a rich blend of
          traditions, languages, festivals, and beliefs.
        </p>

        <div class="image-right">
          <img
            :src="cultureImg"
            alt="People and Culture"
            @error="e => e.target.src = placeholder"
          />
        </div>
      </section>

    </main>

    <FooterBar />

    <!-- Floating Social Media -->
    <div
      class="fixed top-1/2 left-4 -translate-y-1/2
             flex flex-col gap-2 z-50 opacity-70"
    >
      <a href="https://www.facebook.com/share/1BuieJf2kt/" target="_blank">
        <img :src="facebook" class="w-12 h-12" />
      </a>
      <a href="https://www.instagram.com/visitmalaysiaofficial" target="_blank">
        <img :src="instagram" class="w-12 h-12" />
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Hero */
.hero {
  height: 65vh;
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  height: 100%;
  background: rgba(0,0,0,.55);
  display: flex;
  align-items: center;
  padding-left: 8%;
}
.hero h1 {
  color: #fff;
  font-size: 3.5rem;
}
.hero span {
  color: #f9c74f;
}

/* Editorial layout */
.editorial {
  max-width: 1100px;
  margin: 80px auto;
  padding: 0 20px;
}

.block {
  margin-bottom: 100px;
}

.block h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.block p {
  color: #555;
  line-height: 1.8;
  max-width: 720px;
}

/* Image styles */
.image-right,
.image-left,
.image-center {
  margin-top: 40px;
}

.image-right img {
  margin-left: auto;
}

.image-left img {
  margin-right: auto;
}

.image-center img {
  margin: 0 auto;
}

.block img {
  width: 520px;
  border-radius: 10px;
  display: block;
}

.sub-text {
  margin-top: 30px;
}

/* Responsive */
@media (max-width: 768px) {
  .block img {
    width: 100%;
  }
}
</style>
