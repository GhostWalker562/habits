// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@formkit/nuxt",
    "@nuxtjs/google-fonts",
  ],
  tailwindcss: {},
  googleFonts: {
    download: true,
    families: {
      Quicksand: true,
    },
  },
});
