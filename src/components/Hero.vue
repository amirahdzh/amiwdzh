<template>
  <div class="hero-section">
    <!-- Canvas untuk petal animasi -->
    <canvas ref="petalCanvas" class="petal-canvas"></canvas>

    <!-- Matahari sebagai tombol untuk toggle tema -->
    <div class="sun" @click="toggleTheme">
      <!-- Gunakan tombol dengan ikon -->
      <button class="theme-toggle-btn">
        <span class="sun-icon">{{
          theme.global.current.value.dark ? "🌙" : "☀️"
        }}</span>
      </button>
    </div>

    <!-- Konten di atas canvas -->
    <div class="hero-content">
      <!-- <h1 class="hero-title">A M I W</h1> -->
      <!-- Avatar-->
      <div class="avatar-container" @click="scrollToContent" x>
        <img
          src="/images/image.jpg"
          alt="Amiw Avatar"
          class="avatar-image"
        />
      </div>
      <div class="my-4">
        <p class="hero-description">FULL-STACK DEVELOPER</p>
        <p class="typewriter">{{ currentText }}</p>
      </div>
      <!-- <p class="hero-description">
        <p>FULL-STACK DEVELOPER</p>
        <span class="typewriter">{{ currentText }}</span>
      </p> -->
      <!-- <p>Maybe I am a coder?</p> -->

      <!-- Ikon Tech Stack -->
      <!-- <div class="tech-stack">
        <v-icon>mdi-react</v-icon>
        <v-icon>mdi-vuejs</v-icon>
        <v-icon>mdi-laravel</v-icon>
        <v-icon>mdi-nodejs</v-icon>
        <v-icon>mdi-database</v-icon>
      </div> -->

      <!-- Ikon untuk LinkedIn, GitHub, dan Contact Me -->
      <!-- <div class="social-icons">
        <a href="https://www.linkedin.com/in/amirahdzh" target="_blank">
          <v-icon>mdi-linkedin</v-icon>
        </a>
        <a href="https://github.com/amirahdzh" target="_blank">
          <v-icon>mdi-github</v-icon>
        </a>
        <a href="mailto:amirahdzh@gmail.com">
          <v-icon>mdi-email</v-icon>
        </a>
      </div> -->

      <div class="scroll-indicator" @click="scrollToContent">
        <button class="circle-button">
          <v-icon>mdi-arrow-down</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useTheme } from "vuetify";

// Theme setup using Vuetify's theme system
const theme = useTheme();
const savedTheme = localStorage.getItem("theme") || "light"; // Default to 'light' if no theme in localStorage
theme.global.name.value = savedTheme;

// Toggle between light and dark theme
function toggleTheme() {
  const newTheme = theme.global.current.value.dark ? "light" : "dark";
  theme.global.name.value = newTheme;
  localStorage.setItem("theme", newTheme); // Save theme choice in localStorage
}

// References untuk canvas
const petalCanvas = ref(null);

// Data teks yang akan ditampilkan
const textArray = ["and self-proclaimed writer, LOL XD"];
const currentText = ref("");
const currentIndex = ref(0);

// Interval untuk mengetik dan menghapus teks
let typingInterval;
let deletingInterval;

// Fungsi utama untuk mengetik dan menghapus teks secara berulang
const cycleText = () => {
  const currentString = textArray[currentIndex.value];
  typeText(currentString, () => {
    deleteText(currentString, () => {
      currentIndex.value = (currentIndex.value + 1) % textArray.length;
      cycleText();
    });
  });
};

// Fungsi untuk mengetik teks
const typeText = (text, callback) => {
  let index = 0;
  currentText.value = "";
  typingInterval = setInterval(() => {
    currentText.value += text[index];
    index += 1;
    if (index === text.length) {
      clearInterval(typingInterval);
      setTimeout(callback, 500);
    }
  }, 50);
};

// Fungsi untuk menghapus teks
const deleteText = (text, callback) => {
  let index = text.length;
  deletingInterval = setInterval(() => {
    currentText.value = text.substring(0, index);
    index -= 1;
    if (index === 0) {
      clearInterval(deletingInterval);
      setTimeout(callback, 200);
    }
  }, 50);
};

// Fungsi untuk animasi petal
const startPetalAnimation = () => {
  const canvas = petalCanvas.value;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const TOTAL = 30;
  const petalArray = [];
  const petalImg = new Image();
  petalImg.src = "https://djjjk9bjm164h.cloudfront.net/petal.png";

  petalImg.addEventListener("load", () => {
    for (let i = 0; i < TOTAL; i++) {
      petalArray.push(new Petal());
    }
    render(petalArray, ctx);
  });

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      const scaleFactor = Math.min(canvas.width, canvas.height) / 1000;
      this.w = (25 + Math.random() * 15) * scaleFactor;
      this.h = (20 + Math.random() * 10) * scaleFactor;
      this.x = Math.random() * canvas.width;
      this.y = -this.h;
      this.opacity = this.w;
      this.flip = Math.random();
      this.xSpeed = (Math.random() - 0.5) * 3 * scaleFactor;
      this.ySpeed = (0.5 + Math.random() * 1.5) * scaleFactor;
      this.flipSpeed = Math.random() * 0.03;
    }

    draw(ctx, petalImg) {
      if (this.y > canvas.height || this.x > canvas.width || this.x < 0) {
        this.reset();
      }
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(
        petalImg,
        this.x,
        this.y,
        this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
        this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
      );
    }

    animate(ctx, petalImg) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.flip += this.flipSpeed;
      this.draw(ctx, petalImg);
    }
  }

  function render(petalArray, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalArray.forEach((petal) => petal.animate(ctx, petalImg));
    window.requestAnimationFrame(() => render(petalArray, ctx));
  }
};

// Mengatur canvas saat komponen dimuat
onMounted(() => {
  startPetalAnimation();
  cycleText();

  window.addEventListener("resize", () => {
    petalCanvas.value.width = window.innerWidth;
    petalCanvas.value.height = window.innerHeight;
  });
});

// Membersihkan event listener saat komponen di-unmount
onBeforeUnmount(() => {
  clearInterval(typingInterval);
  clearInterval(deletingInterval);
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
  animation: 1.5s fadeIn ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0; /* Mulai dengan elemen transparan */
  }
  50% {
    opacity: 0.5; /* Elemen menjadi setengah terlihat */
  }
  100% {
    opacity: 1; /* Elemen menjadi sepenuhnya terlihat */
  }
}

.sun {
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
  z-index: 2;
  min-height: 50px;
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
  /* font-style: italic; */
  font-weight: 1000;
  color: rgb(var(--v-theme-on-background));
  /* font-family: "Courier New", Courier, monospace; */
}

.hero-description {
  /* font-size: clamp(2rem, 5vw, 3rem); */
  font-size: clamp(1.5rem, 3vw, 3rem);
  /* display: inline-block; */
  position: relative;
  /* min-height: 5rem; */
  /* align-items: center; */
  font-weight: 700;
  
}

.typewriter {
  display: inline-block;
  font-family: "Courier New", Courier, monospace;
  font-size: clamp(1rem, 1.5vw, 3rem);
  color: rgb(var(--v-theme-primary));
  overflow: hidden;
  white-space: nowrap;
  border-right: 0.1rem solid rgb(var(--v-theme-primary));
  font-weight: 900;
  /* margin-bottom: 1rem; */
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: rgb(var(--v-theme-on-background));
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  animation: bounce 2s infinite;
  /* margin-top: 2rem; */
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.scroll-indicator v-icon {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.circle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  color: rgb(var(--v-theme-on-background));
  /* background-color: rgb(var(--v-theme-primary)); */
  transition: transform 0.2s ease, background-color 0.2s ease;
  border: 2px solid rgb(var(--v-theme-on-background));
}

.circle-button:hover {
  transform: scale(1.1);
}

.circle-button v-icon {
  font-size: 24px;
}

.petal-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.sun-icon {
  font-size: clamp(3rem, 5vw, 4.5rem);
}

.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw; /* Lebar responsif berdasarkan viewport */
  max-width: 150px; /* Lebar maksimal */
  min-width: 100px; /* Lebar minimal */
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* margin-top: 20px; */
  gap: 15px;
  font-size: clamp(1.5rem, 3vw, 2.5rem); /* Ukuran font responsif */
  /* font-size: 2rem; */
  color: rgb(var(--v-theme-on-background));
  /* margin-bottom: 2rem; */
}

/* .tech-stack .v-icon {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
} */

.tech-stack .v-icon:hover {
  /* transform: scale(1.2); */
  color: rgb(var(--v-theme-primary));
}

.social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-top: 2rem;
  color: rgb(var(--v-theme-background));
  background-color: rgb(var(--v-theme-primary));
  border: 1px solid rgb(var(--v-theme-primary));
  border-radius: 10px;
  padding: 10px;
  /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2); */
}

.social-icons a {
  color: inherit;
  transition: transform 0.3s ease-in-out;
}

.social-icons .v-icon:hover {
  transform: scale(1.2);
  /* color: rgb(var(--v-theme-on-background)); */
}
</style>
