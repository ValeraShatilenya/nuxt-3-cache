<template>
  <load-image>
    <template #image>
      <img class="custom-image" :src="scr" :alt="alt" />
    </template>
    <template #preloader>
      <img class="custom-image" :src="noImageSrc" :alt="alt" />
    </template>
    <template #error>
      <img class="custom-image" :src="noImageSrc" :alt="alt" />
    </template>
  </load-image>
</template>

<script>
import LoadImage from "./LoadImage.vue";

export default {
  components: { LoadImage },
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
  },
  setup: () => ({
    noImageSrc:
      "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg",
  }),
};
</script>
