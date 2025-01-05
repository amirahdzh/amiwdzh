<template>
  <section class="home-section">
    <!-- Welcome Section -->

    <v-row class="welcome-container" no-gutters>
      <!-- Left Column (Deskripsi Diri) -->
      <v-col cols="12" sm="12" md="6" lg="6" class="left-container">
        <div class="description">
          <div>
            <v-img
              src="@/assets/images/image.jpg"
              alt="SMAN 5 Logo"
              class="avatar"
            />
          </div>

          <div>
            <p class="description-name">AMIRAH DZATUL HIMMAH</p>
            <p class="text-caption">(Amiw Dzh)</p>
            <h3 class="text-caption">
              Fullstack Web Developer | Writing Enthusiast
            </h3>
            <!-- Render Social Links -->
            <div class="social-icons">
              <a
                v-for="(social, index) in socialLinks"
                :key="index"
                :href="social.url"
                target="_blank"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </a>
            </div>
          </div>
        </div>
        <p class="summary">
          I am a passionate Web Developer with expertise in full-stack
          development using Laravel and JavaScript Framework. Having earned a
          Bachelor's degree in Computer Science from UPI. I am proficient in
          HTML, CSS, JavaScript, and PHP. I specialize in building responsive,
          and user-friendly websites. I am eager to further enhance my skills in
          a collaborative development environment.
        </p>
        <div class="cta">
          <!-- <div class="cv">CV</div> -->
          <router-link to="/project">
            <div class="cta-text">Take a look at my humble project!</div>
          </router-link>

          <!-- <div class="cta-button"></div> -->
        </div>
      </v-col>

      <!-- Right Column (Skills Section) -->
      <v-col cols="12" md="5" class="right-container">
        <h2 class="mb-4">
          <v-icon color="primary" class="">mdi-cogs</v-icon>
          &nbsp;Skills
        </h2>
        <div>
          <!-- <h3>General</h3> -->

          <div class="skills-list">
            <v-chip
              v-for="(item, index) in skill"
              :key="index"
              class="skill"
              outlined
              >{{ item.name }}</v-chip
            >
          </div>
        </div>
        <div class="empty-space">
          <div class="coming-soon"><i> Hoping to fill it up soon^^</i></div>
        </div>
      </v-col>
    </v-row>

    <div class="section-header">
      <hr />
      <span>EDUCATION & EXPERIENCE</span>
      <hr />
    </div>

    <!-- Education and Experience Section (Two Columns) -->
    <v-row class="section-container" dense>
      <!-- Education Column -->
      <v-col cols="12" md="6" sm="6">
        <h3 class="section-title">
          <v-icon color="primary" class="mr-2">mdi-school</v-icon>
          &nbsp;Education
        </h3>

        <div class="education-container">
          <v-timeline
            align="center"
            side="end"
            direction="vertical"
            truncate-line="end"
          >
            <v-timeline-item
              size="x-small"
              dot-color="rgb(var(--v-theme-primary))"
              >...</v-timeline-item
            >
            <!-- Render Education -->
            <v-timeline-item
              v-for="(item, index) in education"
              :key="index"
              dot-color="rgb(var(--v-theme-primary))"
              size="small"
            >
              <div class="timeline-content">
                <v-img
                  :src="item.logo"
                  :alt="item.institution"
                  class="timeline-logo"
                />
                <div>
                  <strong>{{ item.institution }}</strong>
                  <div class="text-caption time">
                    {{ item.duration }} · {{ item.major }}
                  </div>
                  <div
                    v-for="(activity, i) in item.activities"
                    :key="i"
                    class="text-caption"
                  >
                    {{ activity }}
                  </div>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-col>

      <!-- Experience Column -->
      <v-col cols="12" md="6" sm="6">
        <h3 class="section-title">
          <v-icon color="primary" class="mr-2">mdi-briefcase</v-icon>
          &nbsp;Experience
        </h3>

        <div class="experience-container">
          <v-timeline
            align="center"
            side="end"
            direction="vertical"
            truncate-line="end"
            class="custom-timeline"
          >
            <v-timeline-item
              size="x-small"
              dot-color="rgb(var(--v-theme-primary))"
              >...</v-timeline-item
            >
            <!-- Render Experience -->
            <v-timeline-item
              v-for="(item, index) in experience"
              :key="index"
              dot-color="rgb(var(--v-theme-primary))"
              size="small"
            >
              <div class="timeline-content">
                <v-img
                  :src="item.logo"
                  :alt="item.company"
                  class="timeline-logo"
                />
                <div>
                  <strong>{{ item.company }}</strong>
                  <div class="text-caption time">
                    {{ item.duration }}
                  </div>
                  <div class="text-caption">
                    {{ item.position }}
                  </div>
                  <div
                    v-for="(detail, i) in item.details"
                    :key="i"
                    class="text-caption"
                  >
                    {{ detail }}
                  </div>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              size="x-small"
              dot-color="rgb(var(--v-theme-primary))"
              ><i> ...Looking for a new opportunity</i></v-timeline-item
            >
          </v-timeline>
        </div>
      </v-col>
    </v-row>
    <div class="section-header">
      <hr />
      <span>SOME OF MY LATEST WORK</span>
      <hr />
    </div>

    <div class="card-project">
      <!-- Looping untuk setiap item dalam projects -->
      <div v-for="(item, index) in project.slice(0, 3)" :key="index">
        <v-card class="project-card" @click="openLink(item.link)" outlined>
          <div class="img-container">
            <!-- NOTE | lazy src di <v-img>? -->
            <v-img
              :src="item.thumbnail"
              alt="Card Image"
              :aspect-ratio="16 / 10"
              cover
              class="project-thumbnail"
            ></v-img>
          </div>
          <div class="card-description">
            <div>
              <v-card-title class="project-title">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="project-subtitle">{{
                item.category
              }}</v-card-subtitle>
            </div>

            <div class="arrow-button">→</div>
            <!-- <div class="arrow-button">></div> -->
          </div>
        </v-card>
      </div>
    </div>
  </section>
</template>

<script setup>
// import { ref } from "vue";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { socialLinks } from "@/data/social";
import { skill } from "@/data/skill";
import { project } from "@/data/project";

const openLink = (link) => {
  window.open(link, "_blank", "noopener,noreferrer");
};

// const router = useRouter();
</script>

<style scoped>
/* .home-section {
  padding-top: 20px;
} */
.welcome-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
}

.description {
  display: flex;
  align-items: start; /* Pastikan elemen-elemen berada di tengah secara vertikal */
  gap: 1.5rem; /* Memberi jarak antara avatar dan deskripsi */
}

.description-name {
  font-size: clamp(1.1rem, 3vw, 1.5rem); /* Ukuran font nama dengan clamp */
  font-weight: 700;
}

.left-container {
  /* margin-bottom: 30px; */
  margin-right: 30px;
}

.right-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* margin-bottom: 30px; */
}

@media (max-width: 600px) {
  .right-container {
    margin-top: 20px; /* Jarak antara right-container dan left-container */
  }
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%; /* Membuat avatar berbentuk bulat */
  max-width: 100%;
  /* position: absolute; */
}

.social-icons {
  display: flex;
  gap: 5px; /* Jarak antara ikon */
  margin-left: -3px;
}

.social-icons a {
  color: inherit;
  transition: transform 0.3s ease-in-out;
}

.social-icons .v-icon:hover {
  transform: scale(1.1);
  color: rgb(var(--v-theme-primary));
}

.summary {
  margin-top: 1rem;
  text-align: justify;
}

.cta {
  display: flex;
  justify-content: start;
  align-items: center;
  /* gap: 20px; */
  margin-top: 1rem;
}

.cta-button {
  color: rgb(var(--v-theme-background));
  background-color: rgb(var(--v-theme-primary));
  border: 1px solid rgb(var(--v-theme-primary));
  cursor: pointer;
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 10px;
}

.cta-text {
  text-decoration: underline;
  color: rgb(var(--v-theme-primary));
  cursor: pointer;
  font-weight: 600;
}

.empty-space {
  height: 100px; /* Memenuhi tinggi kontainer induk */
  display: flex;
  align-items: center; /* Untuk menyelaraskan konten secara vertikal */
  justify-content: center; /* Menyelaraskan konten secara horizontal */
}

.coming-soon {
  opacity: 0.5;
  font-size: 1.5rem;
}

.section-title {
  display: flex;
  /* align-items: center; */
  /* margin-left: 1.5rem; */
  font-size: 1.5rem;
}

.skills-container {
  margin-bottom: 40px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
}

.education-container,
.experience-container {
  margin-left: -20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.timeline-content {
  display: flex;
  align-items: start;
  /* justify-content: start; */
  gap: 1em; /* Jarak antara logo dan teks */
}

.timeline-logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%; /* Opsional: Membuat logo berbentuk bulat */
}

.time {
  color: gray;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* color: #666; */
  font-size: 12px;
  font-weight: 700;
  opacity: 0.5;
  margin-block: 1.5rem;
}

.section-header hr {
  flex: 1;
  border: none;
  border-top: 1px solid rgb(var(--v-theme-on-background));
}

.skill {
  margin-right: 5px;
  margin-bottom: 5px;
}

.card-project {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  /* padding: 20px; */
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
