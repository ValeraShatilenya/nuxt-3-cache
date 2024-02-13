import { defineStore } from "pinia";
// import cachedAxios from "~/utils/cachedAxios";
import axios from "axios";

export const useProductsStore = defineStore("products", {
  state: () => {
    return { products: [] };
  },
  actions: {
    async fetch() {
      console.log(useNitro());
      const { data: products } = await useFetch("/api/products");
      this.products = products;

      // const { data } = await axios
      //   .create({
      //     baseURL: "https://dummyjson.com",
      //   })
      //   .get("/products?limit=2");
      // this.products = data.products;
    },
  },
});
