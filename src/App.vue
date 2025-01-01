<template>
  <v-app>
    <!-- App Header and Tabs Navigation -->
    <!-- <AppHeader /> -->
    <!-- <ProjectSection /> -->

    <v-fab
      :icon="currentIcon"
      :color="currentColor"
      @click="toggleTheme"
      class="fab-button"
    />
    <v-container style="padding-top: 60px">
      <div class="flex">
        <div class="fab">
          <b>Amiw's </b>
          <!-- <v-fab
            :icon="currentIcon"
            variant="text"
            @click="toggleTheme"
          ></v-fab> -->
        </div>
        <div class="tab">
          <v-tabs v-model="tab" align-tabs="end" color="primary" vertical>
            <v-tab :value="1">Home</v-tab>
            <v-tab :value="2">Project</v-tab>
            <v-tab :value="3">Blog</v-tab>
          </v-tabs>
        </div>
      </div>

      <!-- Tabs Window with Content -->
      <v-tabs-window v-model="tab">
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
    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useTheme } from "vuetify";
import HomeSection from "@/components/HomeSection.vue";
import ProjectSection from "@/components/ProjectSection.vue";
import BlogSection from "@/components/BlogSection.vue";
import AppFooter from "@/components/AppFooter.vue";

const theme = useTheme();

// Ambil tema dari localStorage, default ke "light"
const savedTheme = localStorage.getItem("theme") || "light";
theme.global.name.value = savedTheme;

// Simpan ikon dan warna tema
const currentIcon = computed(() =>
  theme.global.current.value.dark ? "mdi-weather-sunny" : "mdi-weather-night"
);
const currentColor = computed(() =>
  theme.global.current.value.dark ? "primary" : "black"
);

// Fungsi toggle tema
function toggleTheme() {
  const newTheme = theme.global.current.value.dark ? "light" : "dark";
  theme.global.name.value = newTheme;
  localStorage.setItem("theme", newTheme); // Simpan tema ke localStorage
}

// Ambil tab aktif dari localStorage, default ke tab pertama (1)
const tab = ref(Number(localStorage.getItem("activeTab")) || 1);

// Watch untuk menyimpan tab aktif ke localStorage
watch(tab, (newTab) => {
  localStorage.setItem("activeTab", newTab);
});
</script>

<style scoped>
/* Styling untuk App.vue */

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertikal sejajar dengan tab */
  gap: 20px; /* Memberikan jarak antara tab dan "test" */
  position: fixed;
  top: 0; /* Menempatkan flex container di bagian atas */
  left: 0; /* Menempatkan flex container di sisi kiri */
  right: 0; /* Menjamin elemen berada di sisi kanan */
  z-index: 10;
  padding: 10px 20px; /* Menambahkan padding agar tidak terlalu rapat */
}

.fab-button {
  position: fixed;
  bottom: 5rem; /* Jarak dari bawah, lebih fleksibel daripada px */
  left: 5rem; /* Jarak dari kanan */
  z-index: 9999; /* Pastikan berada di atas elemen lain */
  box-shadow: inset;
}
</style>
