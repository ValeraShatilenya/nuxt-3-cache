<template>
  <div class="card grid grid-cols-2 gap-10">
    <div class="p-7">
      <img :src="product.image" class="mx-auto" />
    </div>
    <div class="flex flex-col justify-between p-7">
      <div class="my-7">
        {{ product.rating }}
        <h2 class="text-4xl">{{ product.title }}</h2>
        <h3 class="font-semibold mt-7">Product category:</h3>
        <hr class="mb-4 mt-2" />
        <p>{{ product.category }}</p>
        <h3 class="font-semibold mt-7">Product description:</h3>
        <hr class="mb-4 mt-2" />
        <p>{{ product.description }}</p>
      </div>
      <div>
        <p class="text-right text-5xl font-semibold text-gray-600">
          ${{ product.price }}
        </p>
      </div>
    </div>
  </div>
  <NuxtLink
    to="/products"
    class="block text-center w-full transition-all bg-teal-500 text-white rounded-md p-2 hover:bg-teal-600 hover:shadow-md"
  >
    Back
  </NuxtLink>
</template>

<script setup>
const route = useRoute();
const { data: product } = await useFetch(
  `https://fakestoreapi.com/products/${route.params.id}`
);
</script>
