<template>
  <v-app>
    <!-- App Header and Tabs Navigation -->
    <!-- <AppHeader /> -->
     <ProjectSection />
     
     <v-fab :icon="currentIcon" :color="currentColor" @click="toggleTheme" class="fab-button" />
    <v-container style="padding-top: 60px">
      <div class="flex">
        <div class="fab">
          <!-- <v-fab
            :icon="currentIcon"
            variant="text"
            @click="toggleTheme"
          ></v-fab> -->
        </div>
        <div class="tab">
          <v-tabs
            v-model="tab"
            align-tabs="end"
            color="primary"
            vertical
          >
            <v-tab :value="1">Home</v-tab>
            <v-tab :value="2">Project</v-tab>
            <v-tab :value="3">Blog</v-tab>
          </v-tabs>
        </div>
      </div>

      <!-- Tabs Window with Content -->
      <v-tabs-window v-model="tab" style="height: 100vh">
        <!-- Home Section -->
        <v-tabs-window-item :value="1">
          <HomeSection />
        </v-tabs-window-item>

        <!-- About Section -->
        <v-tabs-window-item :value="2">
          <ProjectSection />
        </v-tabs-window-item>

        <!-- Contact Section -->
        <v-tabs-window-item :value="3">
          <BlogSection />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
// import AppHeader from "@/components/AppHeader.vue";
import HomeSection from "@/components/HomeSection.vue";
import ProjectSection from "@/components/ProjectSection.vue";
import BlogSection from "@/components/BlogSection.vue";

const tab = ref(1); // Inisialisasi tab yang aktif

import { computed } from "vue";
import { useTheme } from "vuetify";

// Mendapatkan objek tema Vuetify
const theme = useTheme();

// Menyimpan status ikon
const currentIcon = computed(() => {
  return theme.global.current.value.dark
    ? "mdi-weather-sunny"
    : "mdi-weather-night";
});

// Menyimpan status ikon
const currentColor = computed(() => {
  return theme.global.current.value.dark
    ? "primary"
    : "black";
});

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<style scoped>
/* Styling untuk App.vue */
.fab-button {
  position: fixed;
  bottom: 5%; /* Jarak dari bawah */
  right: 5%; /* Jarak dari kanan */
  z-index: 9999; /* Pastikan berada di atas elemen lain */
  box-shadow: inset;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertikal sejajar dengan tab */
  gap: 20px; /* Memberikan jarak antara tab dan "test" */
}

.fab-button {
  position: fixed;
  bottom: 5rem; /* Jarak dari bawah, lebih fleksibel daripada px */
  right: 5rem;  /* Jarak dari kanan */
  z-index: 9999; /* Pastikan berada di atas elemen lain */
}
</style>
