<template>
  <v-footer height="42" app>
    <v-btn
      icon
      @click="toggleTheme"
      class="theme-toggle-btn mx-2 mb-2"
      :color="currentColor"
      :title="'Toggle Theme'"
    >
      <v-icon :icon="currentIcon" />
    </v-btn>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 30 : 20" />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 20px"
    >
      &copy;
      <span class="d-none d-sm-inline-block">Created with 💖 by </span> Amiw 🌺
    </div>
  </v-footer>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

// Computed properties for current icon and color based on the active theme
const currentIcon = computed(() =>
  theme.global.current.value.dark ? "mdi-weather-sunny" : "mdi-weather-night"
);
const currentColor = computed(() =>
  theme.global.current.value.dark ? "primary" : "black"
);

// Toggle between light and dark theme
function toggleTheme() {
  const newTheme = theme.global.current.value.dark ? "light" : "dark";
  theme.global.name.value = newTheme;
  localStorage.setItem("theme", newTheme); // Save theme choice in localStorage
}

const items = [
  // {
  //   title: "Vuetify Documentation",
  //   icon: `$vuetify`,
  //   href: "https://vuetifyjs.com/",
  // },
  {
    title: "Amiw Facebook",
    icon: "mdi-facebook",
    href: "https://www.facebook.com/amiwdzh",
  },

  {
    title: "Amiw GitHub",
    icon: `mdi-github`,
    href: "https://www.github.com/amirahdzh",
  },
  {
    title: "Amiw Instagram",
    icon: `mdi-instagram`,
    href: "https://www.instagram.com/amiw.dzh",
  },
  {
    title: "Amiw LinkedIn",
    icon: `mdi-linkedin`,
    href: "https://www.linkedin.com/in/amirahdzh",
  },
  // {
  //   title: "Amiw Flutter",
  //   icon: [
  //     "M14.314 0L2.3 12 6 15.7 21.684.012h-7.357L14.314 0zm.014 11.072l-6.471 6.457 6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.371z",
  //   ],
  //   href: "https://flutter.dev",
  // },

  // {
  //   title: "Amiw X",
  //   icon: [
  //     "M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z",
  //   ],
  //   href: "https://x.com/amiwdzh",
  // },
];
</script>

<style scoped>
.social-link .v-icon {
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity));
  text-decoration: none;
  transition: 0.2s ease-in-out;
}

.social-link .v-icon:hover {
  color: rgb(var(--v-theme-primary));
}

.theme-toggle-btn {
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity));
}

.theme-toggle-btn:hover {
  color: rgb(var(--v-theme-primary));
}
</style>
