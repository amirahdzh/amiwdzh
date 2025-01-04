<template>
  <v-app id="app">
    <!-- Hero Section -->
    <div class="top-content">
      <Hero />
    </div>

    <!-- FAB untuk ScrollUp -->
    <v-fab
      icon="mdi-chevron-up"
      color="primary"
      @click="scrollToTop"
      class="fab-button-scrollup"
      :class="{ hidden: isFabScrollUpHidden }"
    />

    <!-- Header -->
    <header class="header">
      <div class="logo-container"></div>
      <v-tabs align-tabs="end" color="primary" vertical>
        <v-tab @click="handleTabChange" :to="'/'">Home</v-tab>
        <v-tab @click="handleTabChange" :to="'/project'">Project</v-tab>
        <v-tab @click="handleTabChange" :to="'/blog'">Blog</v-tab>
      </v-tabs>
    </header>

    <!-- Content Area -->
    <main class="content-container" ref="contentContainer">
      <router-view />
    </main>

    <!-- Footer with Transition -->
    <transition name="footer-slide">
      <AppFooter v-if="isFooterVisible" />
    </transition>
  </v-app>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useTheme } from "vuetify";
import { useRoute } from "vue-router"; // Import useRoute from vue-router
import Hero from "@/components/Hero.vue";
import AppFooter from "@/components/AppFooter.vue";

// Theme Setup
const theme = useTheme();
theme.global.name.value = localStorage.getItem("theme") || "light";

const isFabScrollUpHidden = ref(true);
const isFooterVisible = ref(false);

let lastScrollTop = 0;

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const route = useRoute(); // Hook to get the current route

// Handle Scroll
function handleScroll() {
  const currentScrollTop = window.scrollY;
  const topContentRect = document
    .querySelector(".top-content")
    ?.getBoundingClientRect();
  const isTopContentInView = topContentRect?.bottom > 500;

  isFooterVisible.value = !isTopContentInView;
  isFabScrollUpHidden.value = !(
    currentScrollTop < lastScrollTop && currentScrollTop > 100
  );

  lastScrollTop = Math.max(currentScrollTop, 0);
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Handle Tab Change for Smooth Scroll
function handleTabChange() {
  nextTick(() => {
    // const contentContainer = $refs.contentContainer;
    const contentContainer = document.querySelector(".content-container");
    if (contentContainer) {
      contentContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
</script>

<style scoped>
#app {
  /* margin-bottom: 40px; */
  padding-bottom: 40px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgba(var(--v-theme-background), 0.9);
}

.fab-button-scrollup {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  z-index: 9999;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.fab-button-scrollup.hidden {
  transform: translateY(100px);
  opacity: 0;
  pointer-events: none;
}

.content-container {
  padding: 5%;
  padding-top: 50px;
  padding-bottom: 30px;
  border-radius: 12px;
}

.footer-slide-enter-active,
.footer-slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.footer-slide-enter-from,
.footer-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.poppins {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem; /* Ukuran subtitle lebih kecil */
}
</style>
