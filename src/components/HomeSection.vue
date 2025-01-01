<template>
  <div class="hero-section">
    <v-row class="align-center" style="height: 100vh">
      <v-col class="text-center" cols="12">
        <div
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        >
          <v-img
            src="@/assets/images/maple.png"
            alt="Hero Image"
            class="mb-4 hero-image"
            height="400px"
          />
        </div>
        <h1 class="display-2 hero-title typewriter">Hello... I'm Amiw! 👋</h1>
        <p class="headline hero-subtitle">
          a dedicated software developer and writing enthusiast. My focus is on
          creating clean, functional, and user-friendly websites that not only
          look great but also solve real-world problems. I enjoy combining
          creativity with technical skills to build solutions that make everyday
          tasks easier. Beyond web development, I’m passionate about writing,
          whether it’s sharing knowledge through blogs or diving into
          storytelling.
        </p>
        <v-btn color="primary" large class="mt-4 hero-button" href="#about">
          Learn More
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
// HeroSection logic
</script>

<style scoped>
/* Styling untuk HeroSection.vue */
.typewriter {
  display: inline-block;
  font-size: 2rem;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid transparent; /* Ganti dengan transparent untuk menghilangkan kursor awal */
  width: 0;
  animation: typing 2s steps(20) 1s infinite, blink 0.75s step-end infinite;
}

/* Animasi mengetik */
@keyframes typing {
  to {
    width: 100%;
  }
}

/* Animasi kedip kursor */
@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
