<template>
  <div class="project-section">
    <!-- Filter dengan ukuran lebih kecil dan desain lebih simpel -->
    <!-- <v-select
      v-model="selectedCategory"
      :items="categories"
      label="Filter by Category"
      outlined
      dense
      class="filter-select mb-4"
    /> -->
    <v-row class="align-center" justify="center" dense>
      <v-col
        v-for="project in filteredProjects"
        :key="project.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="project-card" elevation="4">
          <v-img
            :src="project.thumbnail"
            alt="Project Thumbnail"
            height="200px"
            class="mb-3"
          />
          <v-card-title class="headline">{{ project.name }}</v-card-title>
          <v-card-text class="project-description">
            <!-- Tampilkan deskripsi sesuai dengan status showFullDescription -->
            <span v-if="project.showFullDescription">
              {{ project.description }}
            </span>
            <span v-else>
              {{ getExcerpt(project.description) }}
            </span>
            <br />
            <!-- Tombol Read More / Read Less -->
            <span
              @click="toggleDescription(project)"
              class="see-more-btn"
            >
              {{ project.showFullDescription ? "Read Less" : "Read More" }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              :href="project.link"
              target="_blank"
              outlined
            >
              View Repository
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Data proyek
const projects = ref([
  {
    id: 1,
    name: "Personal Portfolio",
    thumbnail: "/images/image.jpg",
    description:
      "A Vue.js-based portfolio website showcasing my work, skills, and achievements in web development. It is responsive, modern, and visually appealing.",
    techstack: ["Vue.js", "Vuetify", "CSS"],
    link: "https://github.com/amiw/personal-portfolio",
    status: "Completed",
    showFullDescription: false,
  },
  {
    id: 2,
    name: "Weather App",
    thumbnail: "/images/image.jpg",
    description:
      "A weather forecasting app using Vue.js and OpenWeather API. This app provides real-time weather updates and forecasts for multiple cities around the world.",
    techstack: ["Vue.js", "Axios", "OpenWeather API"],
    link: "https://github.com/amiw/weather-app",
    status: "In Progress",
    showFullDescription: false,
  },
  {
    id: 3,
    name: "Task Manager",
    thumbnail: "/images/image.jpg",
    description:
      "A simple and user-friendly task manager app built with Vue.js and Firebase. This app allows users to add, edit, and track tasks seamlessly.",
    techstack: ["Vue.js", "Firebase", "Tailwind CSS"],
    link: "https://github.com/amiw/task-manager",
    status: "Completed",
    showFullDescription: false,
  },
]);

// Kategori filter
const selectedCategory = ref("All");
const categories = ["All", "Completed", "In Progress"];

// Fungsi filter proyek berdasarkan kategori
const filteredProjects = computed(() => {
  if (selectedCategory.value === "All") {
    return projects.value;
  }
  return projects.value.filter(
    (project) => project.status === selectedCategory.value
  );
});

// Fungsi untuk mendapatkan excerpt dari deskripsi
const getExcerpt = (description, maxLength = 100) => {
  return description.length > maxLength
    ? description.slice(0, maxLength) + "..."
    : description;
};

// Fungsi untuk toggle status deskripsi lengkap atau terpotong
const toggleDescription = (project) => {
  project.showFullDescription = !project.showFullDescription;
};
</script>

<style scoped>
.project-section {
  padding: 2rem 1rem;
}

.filter-select {
  max-width: 300px;
  margin: 0 auto;
}

.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.project-description {
  font-size: 0.9rem;
  color: #555;
}

.project-card img {
  border-radius: 8px;
}

.project-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.v-select .v-input__control {
  border-radius: 8px;
  box-shadow: none;
}

.v-select .v-input__slot {
  padding: 0.5rem;
}

.see-more-btn {
  padding: 5px 10px;
  font-size: 0.875rem;
  font-weight: bold;
  color: #1976d2;
  cursor: pointer;
  text-decoration: none;
}

.see-more-btn:hover {
  color: #0056b3;
}
</style>
