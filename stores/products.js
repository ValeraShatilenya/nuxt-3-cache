import axios from "axios";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => {
    return { products: [] };
  },
  actions: {
    async fetch() {
      // const { $cachedAxios } = useNuxtApp();

      // const { data } = await $cachedAxios("PRODUCTS").get("/products?limit=20");

      const { data } = await axios
        .create({ baseURL: "https://dummyjson.com" })
        .get("/products?limit=20");

      this.products = data.products;
    },
  },
});
