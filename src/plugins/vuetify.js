/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import colors from "vuetify/lib/util/colors"; // Impor palet warna Vuetify

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark", // Atur tema default, bisa 'light' atau 'dark'
    themes: {
      light: {
        dark: false,
        colors: {
          background: colors.grey.lighten4, // Gunakan warna dari utilitas Vuetify
          surface: colors.grey.lighten3,
          primary: colors.pink.lighten3, 
          "on-background": colors.shades.black, // Teks di latar belakang
          secondary: colors.blue.lighten4, // Warna sekunder
        },
      },
      dark: {
        dark: true,
        colors: {
          background: colors.grey.darken4,
          surface: colors.grey.darken3,
          primary: colors.pink.lighten4, 
          "on-background": colors.shades.white,
          secondary: colors.blue.lighten4,
        },
      },
    },
  },
  directives: {
    motion: motion(),
  },
});
