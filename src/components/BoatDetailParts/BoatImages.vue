<template>
  <v-card>
    <v-carousel
      show-arrows
      hide-delimiters
    >
      <v-carousel-item
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        cover
      />
    </v-carousel>
  </v-card>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});
</script>
