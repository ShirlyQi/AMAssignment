<template>
  <nav
    class="sticky top-0 z-50 bg-white border-b"
  >
    <div
      class="max-w-7xl mx-auto flex items-center justify-between px-10 h-24"
    >
      <!-- LOGO (IMAGE) -->
      <img
        src="../assets/logo.png"
        alt="Visit Malaysia 2026"
        class="h-12 object-contain"
      />

      <!-- MENU -->
      <ul class="flex items-center space-x-10 text-sm font-semibold">
        <li class="nav-item">ABOUT MALAYSIA</li>
        <li class="nav-item">STATE IN MALAYSIA</li>
        <li class="nav-item">THINGS TO DO</li>
        <li class="nav-item">TRAVEL IDEA</li>
        <li class="nav-item">LOGOUT</li>
        <li class="nav-item">PROFILE</li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav-item {
  position: relative;
  cursor: pointer;
  color: #1f2937; /* gray-800 */
}

.nav-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #b45309; /* amber-700 */
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}
</style>
