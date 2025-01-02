<template>
    <div class="flower-svg-container">
      <svg
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        class="flower-svg"
      >
        <g v-for="(path, index) in paths" :key="index">
          <path
            :d="path"
            fill="currentColor"
            stroke="currentColor"
            :stroke-width="strokeWidth"
            class="flower-path"
          />
        </g>
      </svg>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { paths } from "@/data/flowerPaths.js"; // Import data paths from a separate file
  
  export default {
    name: "FlowerSvg",
    setup() {
      const width = ref(500);
      const height = ref(500);
      const strokeWidth = ref(2);
      const pathsData = ref(paths);
  
      return {
        width,
        height,
        strokeWidth,
        paths: pathsData,
      };
    },
  };
  </script>
  
  <style scoped>
  .flower-svg-container {
    color: rgb(
      var(--v-theme-primary)
    ); /* Atur warna primary sebagai color kontainer */
  }
  
  .flower-svg {
    width: 80px;
    height: auto;
  }
  
  .flower-path {
    fill: currentColor; /* Gunakan currentColor untuk fill */
    /* stroke: rgb(
      var(--v-theme-on-background)
    );
    stroke-width: 10px; */
  }
  </style>
  