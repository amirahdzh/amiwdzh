<template>
  <div class="blog-container">
    <div class="top-content">
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
        </p>
      </div>
      <v-card
        class="card-medium"
        subtitle="medium.com/@amiwdzh"
        title="Amiw Dzh"
        @click="openMediumProfile"
      >
        <template v-slot:prepend>
          <v-avatar size="42" class="mr-2">
            <v-img alt="John" src="/images/image.jpg"></v-img>
          </v-avatar>
        </template>
      </v-card>
    </div>

    <div class="section-blog">
      <!-- Filter kategori -->
      <div class="category-filter">
        <v-chip
          v-for="category in allCategories"
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="handleCategoryClick(category)"
          class="category-chip"
        >
          {{ category }}
        </v-chip>
      </div>
      <div class="separator">
        <hr />
      </div>

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
        <li v-for="post in filteredPosts" :key="post.link">
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
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  name: "BlogSection",
  setup() {
    const posts = ref([]);
    const error = ref(null);
    const isLoading = ref(true); // Menambahkan status loading
    const selectedCategory = ref("All"); // Set default kategori ke "All"

    // Daftar kategori yang ingin ditampilkan
    const allowedCategories = ["technology", "story", "poetry", "inspiration", "islam"];

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
    onMounted(() => {
      // Cek kategori yang disimpan di localStorage
      const savedCategory = localStorage.getItem("selectedCategory");
      if (savedCategory) {
        selectedCategory.value = savedCategory;
      }
      fetchRSSFeed();
    });

    // Fungsi untuk mengembalikan excerpt dari deskripsi
    const getExcerpt = (description) => {
      const maxLength = 100; // Batasan karakter
      const textOnly = description.replace(/<[^>]+>/g, ""); // Menghapus HTML
      return textOnly.length > maxLength
        ? textOnly.slice(0, maxLength) + "..."
        : textOnly;
    };

    // Fungsi untuk membuka profil Medium
    const openMediumProfile = () => {
      window.open(
        "https://medium.com/@amiwdzh",
        "_blank",
        "noopener,noreferrer"
      );
    };

    // Mengambil hanya kategori yang diizinkan
    const allCategories = computed(() => {
      const categories = new Set();
      posts.value.forEach((post) => {
        post.categories.forEach((category) => {
          if (allowedCategories.includes(category)) {
            categories.add(category);
          }
        });
      });
      return ["All", ...Array.from(categories)];
    });

    // Filter postingan berdasarkan kategori yang dipilih
    const filteredPosts = computed(() => {
      if (selectedCategory.value === "All") {
        return posts.value;
      }
      return posts.value.filter((post) =>
        post.categories.includes(selectedCategory.value)
      );
    });

    // Menyimpan kategori yang dipilih ke localStorage
    const handleCategoryClick = (category) => {
      selectedCategory.value = category;
      localStorage.setItem("selectedCategory", category); // Simpan kategori yang dipilih
    };

    return {
      posts,
      error,
      isLoading,
      getExcerpt,
      openMediumProfile,
      allCategories,
      selectedCategory,
      filteredPosts,
      handleCategoryClick,
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
  min-height: 100vh;
}

.top-content {
  position: sticky;
  top: 4rem; /* Jarak dari atas layar */
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  width: 100%;
  max-width: 275px;
}

.text-content {
  display: flex;
  flex-direction: column;
}

.blog-description {
  overflow: hidden;
  text-overflow: ellipsis;
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

/* Styling for filter */
.category-filter {
  margin-left: 15px;
  margin-bottom: 20px;
}

.category-chip {
  /* margin: 5px; */
  margin-top: 5px;
}

.category-filter .v-chip {
  margin-right: 10px;
  cursor: pointer;
}

.category-filter .v-chip.active {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-background));
}

@media (max-width: 768px) {
  .blog-container {
    grid-template-columns: 1fr; /* Kolom tunggal di layar kecil */
  }
}
</style>
