<template>
  <div class="hero-section">
    <!-- Canvas untuk pemandangan -->
    <canvas ref="sceneCanvas" class="scene-canvas"></canvas>

    <!-- Canvas untuk petal animasi -->
    <canvas ref="petalCanvas" class="petal-canvas"></canvas>

    <!-- Matahari sebagai tombol untuk toggle tema -->
    <div class="sun" @click="toggleTheme">
      <!-- Gunakan tombol dengan ikon -->
      <button class="theme-toggle-btn">
        <span class="sun-icon">{{ theme.global.current.value.dark ? '🌙' : '☀️' }}</span>
      </button>
    </div>

    <!-- Konten di atas canvas -->
    <div class="hero-content">
      <h1 class="hero-title">A M I W</h1>
      <p class="hero-description">
        <span class="typewriter">{{ currentText }}</span>
      </p>

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
const sceneCanvas = ref(null);
const petalCanvas = ref(null);

// Data teks yang akan ditampilkan
const textArray = ["WRITER", "FULL-STACK DEVELOPER", "TRAVELER"];
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
  }, 150);
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
  }, 100);
};

// Fungsi untuk menggambar pemandangan
const drawScene = () => {
  const canvas = sceneCanvas.value;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#87CEEB");
  gradient.addColorStop(1, "#f1c27d");
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  // drawTrees(ctx, canvas);
};

// Fungsi untuk menggambar pohon
const drawTrees = (ctx, canvas) => {
  const treePositions = getTreePositions(canvas);

  treePositions.forEach(({ x, y }) => {
    drawTree(ctx, x, y);
  });
};

// Fungsi untuk menggambar satu pohon
const drawTree = (ctx, x, y) => {
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(x - 10, y, 20, 80);

  ctx.beginPath();
  ctx.arc(x, y - 10, 40, 0, Math.PI * 2, false);
  ctx.fillStyle = "#228B22";
  ctx.fill();
  ctx.closePath();
};

const getTreePositions = (canvas) => {
  const numTrees = 3; // Jumlah pohon
  const treeWidth = 200; // Lebar pohon
  const totalWidth = canvas.width - treeWidth; // Mengurangi lebar pohon dari canvas width
  const spacing = totalWidth / (numTrees + 1); // Menghitung jarak antar pohon yang merata

  return Array.from({ length: numTrees }, (_, index) => {
    // Menghitung posisi x agar pohon tersebar merata dan tanpa offset ke kiri
    const x = spacing * (index + 1) + treeWidth / 2; // Menempatkan pohon di posisi tengah dari setiap bagian
    const y = canvas.height - 80; // Posisi pohon di bagian bawah canvas
    return { x, y };
  });
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
      this.opacity = this.w ;
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
  drawScene();
  startPetalAnimation();
  cycleText();

  window.addEventListener("resize", () => {
    drawScene();
    petalCanvas.value.width = window.innerWidth;
    petalCanvas.value.height = window.innerHeight;
  });
});

// Membersihkan event listener saat komponen di-unmount
onBeforeUnmount(() => {
  window.removeEventListener("resize", drawScene);
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
  font-style: italic;
  font-weight: 700;
  color: rgb(var(--v-theme-on-background));
  font-family: "Courier New", Courier, monospace;
}

.hero-description {
  font-size: clamp(1rem, 3vw, 3rem);
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
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: var(--v-theme-primary);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  animation: bounce 2s infinite;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: rgb(var(--v-theme-background));
  background-color: rgb(var(--v-theme-on-background));
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.circle-button:hover {
  transform: scale(1.1);
}

.circle-button v-icon {
  font-size: 24px;
}

.scene-canvas,
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
</style>
