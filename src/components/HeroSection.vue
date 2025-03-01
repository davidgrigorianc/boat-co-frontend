<template>
  <v-row class="image-banner">
    <v-col>
      <v-img
        src="/images/boat-banner.webp"
        alt="Boats on the sea"
        class="banner-image"
        cover
      >
        <div class="overlay">
          <h1 class="boats-title">
            Find Your Perfect Boat
          </h1>
          <p class="boats-subtitle">
            Explore a wide range of boats for every adventure.
          </p>
        </div>
      </v-img>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
</script>
<style scoped>

.image-banner {
  margin-top: -70px;
}

.banner-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  position: relative;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 8px;
}

.boats-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.boats-subtitle {
  font-size: 1.2rem;
}
</style>
