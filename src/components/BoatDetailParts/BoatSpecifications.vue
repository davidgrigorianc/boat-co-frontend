<template>
  <v-card>
    <v-card-title>{{ manufacturer }} - {{ model }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-icon>mdi-tag</v-icon>
          {{ formatPrice(price) }}
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-calendar</v-icon>
          Year: {{ year }}
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-ruler</v-icon>
          Length: {{ length }} ft
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-format-list-checks</v-icon>
          Type: {{ boat_type }}
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-check-circle</v-icon>
          Condition:
          <v-chip :color="isNew ? 'green' : 'orange'">
            {{ isNew ? 'New' : 'Used' }}
          </v-chip>
        </v-list-item>
      </v-list>

      <v-divider class="my-4" />
      <v-card-subtitle class="text-h6">
        Boat Description
      </v-card-subtitle>
      <v-card-text class="description-text">
        <p>{{ description }}</p>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  manufacturer: String,
  model: String,
  price: Number,
  year: Number,
  length: Number,
  boat_type: String,
  description: String,
  isNew: Boolean,
  formatPrice: Function
});
</script>
<style scoped>
.description-text {
  color: #555;
  background-color: #f0f4f8;
  padding: 10px;
  border-radius: 5px;
}

.description-text p {
  margin: 0;
}
</style>
