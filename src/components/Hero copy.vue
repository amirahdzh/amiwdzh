<template>
  <div class="hero-section">
    <div class="flower-svg">
      <FlowerSvg class="rotating-flower" />
      <FlowerSvg class="rotating-flower" />
    </div>
    <div class="hero-content">
      <h1 class="hero-title">A M I W</h1>

      <p class="hero-description text-primary">
        <span class="typewriter">{{ currentText }}</span>
      </p>

      <!-- Ikon dan teks sebagai elemen scrolling -->
      <div class="scroll-indicator" @click="scrollToContent">
        <button class="circle-button">
          <v-icon>mdi-arrow-down</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import FlowerSvg from "@/components/FlowerSvg.vue";

// Data teks yang akan ditampilkan
const textArray = ["WRITER", "FULL-STACK DEVELOPER", "TRAVELER"];

const currentText = ref(""); // Teks yang sedang ditampilkan
const currentIndex = ref(0); // Index teks yang sedang ditampilkan
let typingInterval; // Interval untuk mengetik teks
let deletingInterval; // Interval untuk menghapus teks

// Fungsi untuk mengetik teks
const typeText = (text, callback) => {
  let index = 0;
  currentText.value = "";
  typingInterval = setInterval(() => {
    currentText.value += text[index];
    index += 1;
    if (index === text.length) {
      clearInterval(typingInterval);
      setTimeout(callback, 500); // Delay sebelum mulai menghapus
    }
  }, 150); // Waktu mengetik per karakter
};

// Fungsi untuk menghapus teks
const deleteText = (text, callback) => {
  let index = text.length;
  deletingInterval = setInterval(() => {
    currentText.value = text.substring(0, index);
    index -= 1;
    if (index === 0) {
      clearInterval(deletingInterval);
      setTimeout(callback, 200); // Delay sebelum mulai mengetik teks berikutnya
    }
  }, 100); // Waktu menghapus per karakter
};

// Fungsi utama untuk mengatur siklus mengetik dan menghapus teks
const cycleText = () => {
  const currentString = textArray[currentIndex.value];
  typeText(currentString, () => {
    deleteText(currentString, () => {
      currentIndex.value = (currentIndex.value + 1) % textArray.length;
      cycleText(); // Loop untuk teks berikutnya
    });
  });
};

// Menjalankan siklus saat komponen dimuat
onMounted(() => {
  cycleText();
});

// Menghapus event listener saat komponen dibuang
onBeforeUnmount(() => {
  if (typingInterval) {
    clearInterval(typingInterval);
  }
  if (deletingInterval) {
    clearInterval(deletingInterval);
  }
});

// Fungsi untuk menggulir halaman ke content-container
const scrollToContent = () => {
  const contentContainer = document.querySelector(".content-container");
  if (contentContainer) {
    contentContainer.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  background: var(--v-theme-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5vw;
  max-width: 100%;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-style: italic;
  /* margin-bottom: 1rem; */
  font-weight: 700;
  color: rgb(var(--v-theme-on-background));
  font-family: "Courier New", Courier, monospace;
}

.hero-description {
  font-size: clamp(1rem, 3vw, 3rem);
  /* margin-bottom: 2rem; */
  display: inline-block;
  font-family: "Courier New", Courier, monospace;
  color: rgb(var(--v-theme-text));
  position: relative;
  min-height: 5rem;
}

.typewriter {
  display: inline-block;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: rgb(var(--v-theme-accent));
  overflow: hidden;
  white-space: nowrap;
  border-right: 0.1rem solid rgb(var(--v-theme-primary));
  /* animation: blink 1s infinite; */
}

/* Animasi berkedip */
@keyframes blink {
  100% { 
    border-color: transparent;
    /* color: rgb(var(--v-theme-on-background)); */
  }
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  /* margin-top: 2rem; */
  color: var(--v-theme-primary);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  animation: bounce 2s infinite;
}



.scroll-indicator v-icon {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: rgb(var(--v-theme-on-background));
  /* margin-bottom: 0.5rem; */
}

.scroll-indicator:hover {
  color: var(--v-theme-accent);
}

.circle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: rgb(var(--v-theme-background));
  background-color: rgb(var(--v-theme-primary));
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.circle-button:hover {
  transform: scale(1.1);
}

.circle-button v-icon {
  font-size: 24px;
}

.flower-svg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 0;
  margin: 5%;
}

/* Animasi berputar pada FlowerSvg */
.rotating-flower {
  animation: rotateFlower 10s linear infinite;
}

@keyframes rotateFlower {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
