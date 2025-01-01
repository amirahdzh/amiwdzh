<template>
  <!-- <AppHeader /> -->
  <v-container fluid>
    <div class="flex">
    <v-fab :icon="currentIcon" variant="text" @click="toggleTheme" class="fab-button"> </v-fab>
    <v-tabs v-model="tab" align-tabs="end" color="deep-purple-accent-4" vertical>
      <v-tab :value="1">Hero</v-tab>
      <v-tab :value="2">About</v-tab>
      <v-tab :value="3">Contact</v-tab>
    </v-tabs>
  </div>
    <!-- Tabs Window with Content -->
    <v-tabs-window v-model="tab" style="height: 100vh;">
      <!-- Hero Section -->
      <v-tabs-window-item :value="1" style="height: 100vh;">
        <div class="hero-section">
          <v-row class="align-center" style="height: 100vh;">
            <v-col class="text-center" cols="12">
              <div
                v-motion
                :initial="{ opacity: 0, y: 100 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :delay="200"
                :duration="1200"
              >
                <v-img
                  src="@/assets/images/image.jpg"
                  alt="Hero Image"
                  class="mb-4 hero-image"
                  height="400px"
                />
              </div>
              <h1 class="display-2 hero-title typewriter">Hello... I'm Amiw! 👋</h1>
              <p class="headline hero-subtitle" style="font-family: 'Roboto', sans-serif">
                I'm a passionate developer focused on building amazing web experiences.
              </p>
              <v-btn color="primary" large class="mt-4 hero-button" href="#about">
                Learn More
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-tabs-window-item>

      <!-- About Section -->
      <v-tabs-window-item :value="2" style="height: 100vh;">
        <v-row class="about-section" id="about" style="height: 100%;">
          <v-col cols="12" sm="6">
            <v-img src="@/assets/images/image.jpg" alt="About Me" height="400px" />
          </v-col>
          <v-col cols="12" sm="6">
            <h2 class="display-1" style="font-family: 'Della Respira', serif">
              About Me
            </h2>
            <p class="body-1" style="font-family: 'Roboto', sans-serif">
              I'm a web developer with experience in frontend technologies like
              Vue.js, HTML, CSS, and JavaScript. I love creating responsive and
              user-friendly web applications that provide great user experiences.
            </p>
          </v-col>
        </v-row>
      </v-tabs-window-item>

      <!-- Contact Section -->
      <v-tabs-window-item :value="3" style="height: 100vh;">
        <v-row class="contact-section" style="height: 100%;">
          <v-col cols="12" class="text-center">
            <h2 style="font-family: 'Della Respira', serif">Get in Touch</h2>
            <p style="font-family: 'Roboto', sans-serif">
              Feel free to reach out to me for collaboration or project inquiries.
            </p>
            <v-btn color="primary" href="mailto:your-email@example.com" large>
              Contact Me
            </v-btn>
          </v-col>
        </v-row>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
// import AppHeader from '@/components/AppHeader.vue';

const tab = ref(1); // Inisialisasi tab yang aktif
</script>

<style scoped>
.home {
  /* display: flex; */
  justify-content: center; /* Horizontal centering */
  align-items: center; /* Vertical centering */
}

.fab-button {
  position: fixed;
  bottom: 20px; /* Sesuaikan jarak dari bawah */
  right: 20px;  /* Sesuaikan jarak dari kanan */
  z-index: 9999; /* Pastikan berada di atas elemen lain */
}

.hero-section,
.about-section,
.contact-section {
  margin-top: 50px;
}

.v-btn {
  font-family: "Roboto", sans-serif;
  text-transform: none;
}

h1,
h2 {
  margin-bottom: 10px;
}

.v-img {
  border-radius: 15px;
}

.typewriter {
  display: inline-block;
  font-size: 2rem;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid transparent ;
  width: 0;
  animation: typing 3s steps(20) 1s infinite, blink 0.75s step-end 1;
}

@keyframes typing {
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
