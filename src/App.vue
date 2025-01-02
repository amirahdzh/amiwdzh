<template>
  <v-app>
    <!-- Hero Section -->
    <div class="top-content">
      <Hero />
    </div>

    <!-- FAB untuk Theme -->
    <v-fab
      :icon="currentIcon"
      :color="currentColor"
      @click="toggleTheme"
      class="fab-button-theme"
      :style="fabPositionTheme"
      :class="{ hidden: isFabThemeHidden }"
    />

    <!-- FAB untuk ScrollUp -->
    <v-fab
      icon="mdi-chevron-up"
      color="primary"
      @click="scrollToTop"
      class="fab-button-scrollup"
      :style="fabPositionScrollUp"
      :class="{ hidden: isFabScrollUpHidden }"
    />

    <!-- Header with Tabs -->
    <div class="header">
      <div class="logo-container">
        <!-- <b>Amiw's </b> -->
      </div>
      <div class="tab-container">
        <v-tabs align-tabs="end" color="primary" vertical>
          <v-tab :to="'/'">Home</v-tab>
          <v-tab :to="'/project'">Project</v-tab>
          <v-tab :to="'/blog'">Blog</v-tab>
        </v-tabs>
      </div>
    </div>

    <!-- Content Area -->
    <div class="content-container">
      <router-view />
    </div>

    <!-- Footer with Transition -->
    <transition name="footer-slide">
      <AppFooter v-if="isFooterVisible" />
    </transition>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useTheme } from "vuetify";
import Hero from "@/components/Hero.vue";
import AppFooter from "@/components/AppFooter.vue";

// Theme setup using Vuetify's theme system
const theme = useTheme();
const savedTheme = localStorage.getItem("theme") || "light"; // Default to 'light' if no theme in localStorage
theme.global.name.value = savedTheme;

const isFabThemeHidden = ref(false); // Status untuk visibilitas FAB Theme
const isFabScrollUpHidden = ref(true); // Status untuk visibilitas FAB ScrollUp

// Computed properties for current icon and color based on the active theme
const currentIcon = computed(() =>
  theme.global.current.value.dark ? "mdi-weather-sunny" : "mdi-weather-night"
);
const currentColor = computed(() =>
  theme.global.current.value.dark ? "primary" : "black"
);

const isFooterVisible = ref(false);

// Toggle between light and dark theme
function toggleTheme() {
  const newTheme = theme.global.current.value.dark ? "light" : "dark";
  theme.global.name.value = newTheme;
  localStorage.setItem("theme", newTheme); // Save theme choice in localStorage
}

// Floating Action Button (FAB) position on scroll
const fabPositionTheme = ref({ top: "3.5rem", left: "2rem" }); // Posisi default FAB Theme
const fabPositionScrollUp = ref({ bottom: "5rem", right: "5rem" });
let lastScrollTop = 0;

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Handle scroll events to show or hide the FAB for both theme and scrollup
function handleScroll() {
  const currentScrollTop = window.scrollY;

  // Get the top-content element position relative to the viewport
  const topContent = document.querySelector(".top-content");
  const topContentRect = topContent.getBoundingClientRect();

  // Check if top-content is still in the viewport
  const isTopContentInView = topContentRect.bottom > 0;

  // Control footer visibility based on top-content visibility
  isFooterVisible.value = !isTopContentInView;

  // Perbarui status FAB Theme
  isFabThemeHidden.value = !isTopContentInView;

  // Tampilkan FAB ScrollUp hanya jika pengguna scroll ke atas
  if (currentScrollTop < lastScrollTop && currentScrollTop > 100) {
    isFabScrollUpHidden.value = false; // Show FAB on scroll up
  } else {
    isFabScrollUpHidden.value = true; // Hide FAB on scroll down or near the top
  }

  // // Kontrol FAB ScrollUp
  // if (currentScrollTop === 0) {
  //   fabPositionScrollUp.value.bottom = "-5rem"; // Hide ScrollUp FAB at top of the page
  // } else {
  //   fabPositionScrollUp.value.bottom = "5rem"; // Show ScrollUp FAB otherwise
  // }

  // // Kontrol FAB ScrollUp
  // if (isTopContentInView) {
  //   fabPositionScrollUp.value.bottom = "-5rem"; // Hide ScrollUp FAB
  // } else {
  //   if (currentScrollTop > lastScrollTop) {
  //     fabPositionScrollUp.value.bottom = "-5rem"; // Hide ScrollUp FAB on scroll down
  //   } else {
  //     fabPositionScrollUp.value.bottom = "5rem"; // Show ScrollUp FAB on scroll up
  //   }
  // }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative scroll
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<style scoped>
/* Header Styles */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(
    var(--v-theme-background),
    0.9
  ); /* Transparent header */
}

/* FAB ScrollUp Styles */
.fab-button-scrollup {
  position: fixed;
  z-index: 9999;
  transition: transform 0.5s ease, opacity 0.5s ease; /* Smooth transition */
}

.fab-button-scrollup.hidden {
  transform: translateY(100px); /* Hide FAB out of view */
  opacity: 0; /* Make FAB invisible */
  pointer-events: none; /* Disable interactions */
}

/* FAB Theme Styles */
.fab-button-theme {
  position: fixed;
  /* top: 2rem;
  left: 2rem; */
  z-index: 9999;
  transition: transform 0.5s ease, opacity 0.5s ease; /* Animasi untuk transform dan opacity */
}

.fab-button-theme.hidden {
  transform: translateY(100px); /* Pindah keluar layar */
  opacity: 0; /* Sembunyikan secara visual */
  pointer-events: none; /* Nonaktifkan interaksi */
}

/* Content Section Styles */
.content-container {
  padding: 5%;
  padding-top: 50px;
  padding-bottom: 30px;
  background-color: var(--v-theme-surface); /* Adjust based on the theme */
  border-radius: 12px;
}

/* Transisi Footer */
.footer-slide-enter-active,
.footer-slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.footer-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.footer-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}


</style>
