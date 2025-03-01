<template>
  <v-card
    v-if="engines.length"
  >
    <v-card-title class="text-h6 font-weight-bold">
      Engine Details
    </v-card-title>
    <v-divider class="mb-3" />
    <v-card-text>
      <v-list density="compact">
        <v-list-item
          v-for="(engine, index) in engines"
          :key="index"
          class="mb-2"
        >
          <template #prepend>
            <v-icon
              class="mr-2"
              color="primary"
            >
              mdi-engine
            </v-icon>
          </template>
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1 font-weight-medium">
              {{ engine.make }} {{ engine.model }} - {{ engine.power }} HP
            </v-list-item-title>
            <v-list-item-subtitle>
              Type: {{ engine.type }} | Fuel: {{ engine.fuel_type }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="engine.drive_type">
              Drive Type: {{ engine.drive_type }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Hours: {{ engine.hours }} hrs
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  engines: Array
});
</script>

<style scoped>
.v-list-item {
  border-radius: 8px;
  padding: 8px 12px;
}
</style>"}
