// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "nuxt-icon", "nuxt-headlessui"],
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ["stores"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
