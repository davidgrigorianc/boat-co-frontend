<template>
  <v-card>
    <v-card-title>Location</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-icon>mdi-map-marker</v-icon>
          {{ city }}, {{ country }}
        </v-list-item>
      </v-list>
    </v-card-text>
    <div
      id="map"
      style="height:300px;"
    />
  </v-card>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue';
import "leaflet/dist/leaflet.css"
import * as L from 'leaflet';

const props = defineProps({
  city: String,
  country: String,
  latitude: Number,
  longitude: Number
});

const initialMap = ref(null);


onMounted(() => {
  initialMap.value = L.map('map').setView([props.latitude, props.longitude], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);
});
</script>
