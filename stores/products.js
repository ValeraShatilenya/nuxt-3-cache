import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => {
    return { products: [] };
  },
  actions: {
    async fetch() {
      const { $cachedAxios } = useNuxtApp();

      const { data } = await $cachedAxios("PRODUCTS").get("/products?limit=2");

      this.products = data.products;
    },
  },
});
