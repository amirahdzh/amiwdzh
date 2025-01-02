<template>
  <v-app>
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
        <v-tab :to="'/'">Home</v-tab>
        <v-tab :to="'/project'">Project</v-tab>
        <v-tab :to="'/blog'">Blog</v-tab>
      </v-tabs>
    </header>

    <!-- Content Area -->
    <main class="content-container">
      <router-view />
    </main>

    <!-- Footer with Transition -->
    <transition name="footer-slide">
      <AppFooter v-if="isFooterVisible" />
    </transition>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useTheme } from "vuetify";
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

// Handle Scroll
function handleScroll() {
  const currentScrollTop = window.scrollY;
  const topContentRect = document.querySelector(".top-content")?.getBoundingClientRect();
  const isTopContentInView = topContentRect?.bottom > 0;

  isFooterVisible.value = !isTopContentInView;
  isFabScrollUpHidden.value = !(currentScrollTop < lastScrollTop && currentScrollTop > 100);

  lastScrollTop = Math.max(currentScrollTop, 0);
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
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
  background-color: var(--v-theme-surface);
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
</style>
