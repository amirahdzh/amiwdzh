/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import Particles from "vue3-particles";

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(Particles)
}
