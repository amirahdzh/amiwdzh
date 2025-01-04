<template>
  <div class="top-content">
    <div class="text-content">
      <div class="text-h2 font-weight-bold mb-5">&lt;project /&gt;</div>
      <div class="font-italic mb-5">basically, my portfolio.</div>
      <div>
        check out some of my latest works<br />
        either web app, mobile app or others.
      </div>
    </div>
    <div class="img-top">
      <v-img
        src="@/assets/images/image.jpg"
        alt="SMAN 5 Logo"
        class="img-top"
      />
    </div>
  </div>

  <div class="section-header">
    <hr />
    <!-- <span>SOME OF MY LATEST WORK</span> -->
    <!-- <hr /> -->
  </div>

  <div class="card-project">
    <!-- Looping untuk setiap item dalam projects -->
    <div v-for="(project, index) in projects" :key="index">
      <v-card class="project-card" @click="openLink(project.link)" outlined>
        <div class="img-container">
          <v-img
            :src="project.thumbnail"
            alt="Card Image"
            :aspect-ratio="16 / 10"
            cover
            class="project-thumbnail"
          ></v-img>
        </div>
        <div class="card-description">
          <div>
            <v-card-title class="project-title">
              {{ project.title }}
              <!-- <span class="project-title">{{ project.title }}</span> -->
            </v-card-title>
            <v-card-subtitle class="project-subtitle">{{
              project.description
            }}</v-card-subtitle>
          </div>  

          <div class="arrow-button">→</div>
          <!-- <div class="arrow-button">></div> -->
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Data Projects
const projects = ref([
  {
    id: 1,
    thumbnail: "images/image.jpg",
    title: "BookWorld",
    description: "Web App",
    link: "https://portfolio-amirahdzh-bookworld.vercel.app/",
  },
  {
    id: 2,
    thumbnail: "images/project.png",
    title: "Daarul Ummahaat",
    description: "Website",
    link: "https://github.com/amirahdzh/DaarulUmmahaat-FE",
  },
  {
    id: 3,
    thumbnail: "images/project.png",
    title: "Skripsi",
    description: "AI Model",
    link: "#",
  },
  {
    id: 4,
    thumbnail: "images/image.jpg",
    title: "BookWorld",
    description: "Web App",
    link: "https://portfolio-amirahdzh-bookworld.vercel.app/",
  },
  {
    id: 5,
    thumbnail: "images/project.png",
    title: "Daarul Ummahaat",
    description: "Website",
    link: "https://github.com/amirahdzh/DaarulUmmahaat-FE",
  },
  {
    id: 6,
    thumbnail: "images/project.png",
    title: "Skripsi",
    description: "AI Model",
    link: "#",
  },
]);

const openLink = (link) => {
  window.open(link, "_blank", "noopener,noreferrer");
};

// // Navigate to project detail page
// function goToProjectDetail(projectId) {
//   router.push({ name: "project-detail", params: { id: projectId } });
// }
</script>

<style scoped>
/* You can add custom styles here */

.top-content {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  font-size: 1.2rem;
  justify-content: space-evenly;
}

.text-content {
  display: flex;
  flex-direction: column;
}

.img-top {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* color: #666; */
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
  margin: 40px;
}

.section-header hr {
  flex: 1;
  border: none;
  border-top: 1px solid #ccc;
}

.card-project {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.project-card {
  width: 275px; /* Mengatur lebar kartu menjadi 3 per row dengan jarak antar kartu */
  cursor: pointer;
  border-radius: 10px;
  padding: 8px;
  position: relative;
}

.project-thumbnail {
  border-radius: 8px;
}

.project-title {
  font-weight: 400; /* Semi-bold */
  font-size: 1rem; /* Ukuran untuk menonjolkan title */
  padding-left: 8px;
  margin-top: 2px;
  padding-bottom: 4px;
}

.project-subtitle {
  font-weight: 300;
  font-size: 0.8rem; /* Ukuran subtitle lebih kecil */
  padding-left: 8px;
  padding-bottom: 6px;
}

.arrow-button {
  position: absolute;
  right: 30px; /* Atur jarak dari kanan */
  opacity: 0; /* Transparan awalnya */
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(var(--v-theme-on-background));
  transition: opacity 0.5s ease, right 1s ease;
}

.project-card:hover .arrow-button {
  opacity: 0.4; /* Tampil saat hover */
  right: 20px; /* Geser ke kanan sedikit saat hover */
}

.card-description {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
