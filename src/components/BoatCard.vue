<script>
import {computed, onMounted} from 'vue';
import {useAppStore} from '@/stores/app.js';

export default {
  props: {
    boat: Object,
  },
  setup(props) {
    const appStore = useAppStore();
    const countryCode = props.boat.location.country_code;

    const flagUrl = computed(() => {
      return appStore.getFlagUrl(countryCode);
    });

    onMounted(() => {
      if (!flagUrl.value) {
        appStore.preloadFlag(countryCode);
      }
    });

    return {
      flagUrl,
    };
  },
};
</script>

<template>
  <v-card
    class="ma-4"
    elevation="2"
  >
    <v-img
      :src="boat.main_image"
      height="200px"
      class="rounded-t-lg"
    />
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="title-text">
        <span class="headline font-weight-bold">
          {{ boat.year }} {{ boat.manufacturer }} - {{ boat.model }}
        </span>
      </div>
    </v-card-title>
    <v-card-subtitle class="d-flex align-center">
      <v-avatar
        size="24"
        class="mr-2"
      >
        <v-img
          v-if="flagUrl"
          :src="flagUrl"
        />
        <v-progress-circular
          v-else
          indeterminate
          size="24"
          color="primary"
        />
      </v-avatar>
      <span class="body-1">{{ boat.location.city }}, {{ boat.location.country }}</span>
    </v-card-subtitle>
    <v-card-text>
      <div class="d-flex justify-space-between">
        <div class="text-h6">
          {{ boat.price.toLocaleString() }} $
        </div>
        <div>
          <v-chip
            color="primary"
            text-color="white"
          >
            {{ boat.boat_type }}
          </v-chip>
        </div>
      </div>
      <v-btn
        :to="`/boats/${boat.id}`"
        color="primary"
        class="mt-4"
        width="100%"
      >
        View Details
      </v-btn>
    </v-card-text>
  </v-card>
</template>


<style scoped>
.title-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
