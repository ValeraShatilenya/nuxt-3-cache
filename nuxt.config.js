export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  nitro: {
    storage: {
      redis: {
        driver: "redis",
        url: "redis://redis:6379",
      },
      // cache: {
      //   base: "redis",
      // },
    },
  },
  // routeRules: {
  //   "/products": {
  //     swr: 60 * 60,
  //     cache: {
  //       base: "redis",
  //     },
  //   },
  // },
});
