<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="{ id, title, images } in products"
      :key="id"
      class="card flex flex-col gap-5 justify-between"
    >
      <div class="flex flex-col gap-5">
        <img :src="images[0]" class="max-h-32 mx-auto" />
        <p class="font-bold text-gray-500 text-center truncate">
          {{ title }}
        </p>
      </div>
      <NuxtLink
        :to="`/products/${id}`"
        class="block text-center w-full transition-all bg-teal-500 text-white rounded-md p-2 hover:bg-teal-600 hover:shadow-md"
      >
        View details
      </NuxtLink>
    </div>
  </div>
</template>

<!-- <script>
import { useProductsStore } from "@/stores/products";

export default defineNuxtComponent({
  async asyncData() {
    const productsStore = useProductsStore();
    await productsStore.fetch();
    // const products = await fetch("https://fakestoreapi.com/products").then(
    //   (data) => data.json()
    // );
    console.log(productsStore.products);
    return { products: productsStore.products };
  },
});
</script> -->

<!-- <script>
import { useProductsStore } from "@/stores/products";

export default defineNuxtComponent({
  async asyncData() {
    const productsStore = useProductsStore();

    await productsStore.fetch();

    return { products: productsStore.products };
  },
});
</script> -->

<script setup>
import { useProductsStore } from "~/stores/products";
import { onMounted } from "vue";

const productsStore = useProductsStore();

await productsStore.fetch();

const products = productsStore.products;

onMounted(() => {
  // console.log(products);
});
</script>

<!-- <script setup>
const { data: products } = await useFetch("https://fakestoreapi.com/products");
</script> -->
