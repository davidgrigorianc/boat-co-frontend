<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <div class="d-flex justify-space-between">
          <img
            style="cursor: pointer"
            src="@/assets/boat_co.webp"
            alt="Boat Co Logo"
            height="50"
            @click="$router.push('/')"
          >
          <ThemeChangerButton />
        </div>
      </v-toolbar-title>
    </v-app-bar>


    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ThemeChangerButton from "@/components/ThemeChangerButton.vue";

export default {
  name: 'App',
  components: {ThemeChangerButton},
};
</script>

<style>

</style>
