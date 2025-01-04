import { createRouter, createWebHistory } from "vue-router";
import HomeSection from "@/components/HomeSection.vue";
import ProjectSection from "@/components/ProjectSection.vue";
import BlogSection from "@/components/BlogSection.vue";

let isFirstLoad = true; // Flag in memory to track first load

const routes = [
  { path: "/", name: "Home", component: HomeSection },
  { path: "/project", name: "Project", component: ProjectSection },
  { path: "/blog", name: "Blog", component: BlogSection },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Jika ini adalah load pertama kali
    // if (isFirstLoad) {
    //   isFirstLoad = false; // Set flag ke false setelah load pertama kali
    //   return { top: 0 }; // Set posisi scroll ke atas untuk load pertama kali
    // }

    // Jika ini bukan load pertama kali, scroll ke content-container
    if (savedPosition) {
      return savedPosition;
    }
    
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const element = document.querySelector(".content-container");
    //     if (element) {
    //       element.scrollIntoView({ behavior: "smooth", block: "start" });
    //     }
    //     resolve();
    //   }, 100); // Delay sedikit untuk memastikan router selesai
    // });
    // Jika bukan route '/'
    if (to.path !== "/") {
      const element = document.querySelector(".content-container");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return; // Menghentikan proses scroll default
    }
  },
});

export default router;
