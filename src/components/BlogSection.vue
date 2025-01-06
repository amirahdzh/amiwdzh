<template>
  <div class="blog-container">
    <div class="top-content">
      <!-- <div class="img-top">
        <v-img
          src="@/assets/images/image.jpg"
          alt="SMAN 5 Logo"
          class="img-top"
        />
      </div> -->
      <div class="text-content">
        <div class="text-h1 mb-5">blog.</div>
        <div class="font-italic mb-5">
          dive into my thoughts, insights, and stories.
        </div>
        <p class="add-friend">
          I usually write on
          <span class="font-weight-bold text-decoration-none">
            <a
              href="https://www.medium.com"
              class="text-decoration-none text-on-background"
            >
              Medium</a
            ></span
          >, let's be friend!
          <!-- <v-icon color="primary" size="24px" class="ml-2"
            >mdi-account-plus</v-icon
          > -->
        </p>
      </div>
      <v-card
        class="card-medium"
        subtitle="medium.com/@amiwdzh"
        title="Amiw Dzh"
        @click="openMediumProfile"
      >
        <!-- <template v-slot:append>
          <v-avatar color="rgb(var(--v-theme-on-background))" size="42" class="mr-2">
            <img
              src="/icons/medium.svg"
              alt="Medium Logo"
              style="width: 24px; height: 24px"
            />
          </v-avatar>
        </template> -->
        <template v-slot:prepend>
          <v-avatar size="42" class="mr-2">
            <v-img alt="John" src="/images/image.jpg"></v-img>
          </v-avatar>
        </template>
        <!-- <v-card-text
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.</v-card-text
        > -->
      </v-card>
    </div>

    <div class="section-blog">
      <div v-if="error">{{ error }}</div>
      <div v-else-if="isLoading" class="skeleton-container">
        <div v-for="n in 3" :key="n" class="skeleton-item">
          <v-skeleton-loader
            type="card"
            elevation="1"
            class="mb-4"
            :loading="true"
          />
        </div>
      </div>
      <ul v-else>
        <li v-for="post in posts" :key="post.link">
          <div class="medium-content">
            <a
              class="text-h6 font-weight-bold blog-title"
              :href="post.link"
              target="_blank"
              >{{ post.title }}</a
            >
            <p
              class="text-subtitle-3 blog-description"
              v-html="getExcerpt(post.description)"
            ></p>
            <div class="blog-categories">
              <v-chip
                v-for="(category, index) in post.categories"
                :key="index"
                class="mr-2 my-2"
              >
                {{ category }}
              </v-chip>
            </div>
            <p class="text-caption blog-pubdate">
              {{ new Date(post.pubDate).toLocaleDateString() }}
            </p>
          </div>
          <div class="separator">
            <hr />
            <!-- <span>SOME OF MY LATEST WORK</span> -->
            <!-- <hr /> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "BlogSection",
  setup() {
    const posts = ref([]);
    const error = ref(null);
    const isLoading = ref(true); // Menambahkan status loading

    // Fungsi untuk mengambil feed RSS menggunakan API RSS2JSON
    const fetchRSSFeed = async () => {
      const apiUrl =
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40amiwdzh";
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "ok") {
          // Mengonversi data yang diterima menjadi format yang lebih mudah digunakan
          posts.value = data.items.map((item) => ({
            title: item.title,
            link: item.link,
            description: item.content,
            pubDate: item.pubDate,
            categories: item.categories,
          }));
          isLoading.value = false;
        } else {
          error.value = "Failed to fetch RSS feed.";
        }
      } catch (err) {
        error.value = "Failed to fetch RSS feed.";
        console.error(err);
      }
    };

    // Panggil fetchRSSFeed saat komponen dimuat
    onMounted(fetchRSSFeed);
    // Fungsi untuk mengembalikan excerpt dari deskripsi
    const getExcerpt = (description) => {
      const maxLength = 100; // Batasan karakter
      // perlukah DOMPurify?
      // Menghapus semua tag HTML
      const textOnly = description.replace(/<[^>]+>/g, "");
      return textOnly.length > maxLength
        ? textOnly.slice(0, maxLength) + "..."
        : textOnly;
    };

    const openMediumProfile = () => {
      window.open(
        "https://medium.com/@amiwdzh",
        "_blank",
        "noopener,noreferrer"
      );
    };

    return {
      posts,
      error,
      isLoading,
      getExcerpt,
      openMediumProfile,
    };
  },
};
</script>

<style scoped>
/* You can add custom styles here */
.blog-container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Kolom kiri lebih kecil */
  gap: 40px;
  align-items: start;
  /* padding: 20px; */
}

.top-content {
  position: sticky;
  top: 4rem; /* Jarak dari atas layar */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  align-self: start; 
  gap: 20px;
  /* padding: 20px; */
  font-size: 1.2rem;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .top-content {
    position: static; /* Tidak sticky pada layar kecil */
    align-items: center;
  }
}

.card-medium {
  /* width: 300px; */
  width: 100%;
  max-width: 275px;
}

.text-content {
  display: flex;
  flex-direction: column;
  /* align-items: end; */
}

.img-top {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.blog-description {
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  opacity: 0.8;
}

.blog-categories {
  display: flex;
  flex-wrap: wrap;
  margin-block: 0.5rem;
}

.blog-pubdate {
  opacity: 0.6;
}

.medium-content {
  padding: 20px;
}

.blog-title {
  color: rgb(var(--v-theme-on-background));
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

.section-blog {
  display: flex;
  flex-direction: column;
}

.add-friend {
  font-size: medium;
}

@media (max-width: 768px) {
  .blog-container {
    grid-template-columns: 1fr; /* Kolom tunggal di layar kecil */
  }

  .top-content {
    margin-bottom: 20px; /* Tambahkan jarak antar elemen */
  }
}
</style>
