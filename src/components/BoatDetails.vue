<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import BoatImages from "@/components/BoatDetailParts/BoatImages.vue";
import BoatPurchaseDetails from "@/components/BoatDetailParts/BoatPurchaseDetails.vue";
import BoatSpecifications from "@/components/BoatDetailParts/BoatSpecifications.vue";
import BoatLocation from "@/components/BoatDetailParts/BoatLocation.vue";
import BoatEngineDetails from "@/components/BoatDetailParts/BoatEngineDetails.vue";
import {fetchBoatDetailsById} from '@/api/index.js';

const boat = ref(null);
const loading = ref(null);
const route = useRoute();

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchBoatDetailsById(route.params.id);
    boat.value = res.data;
  } catch (error) {
    console.error('Failed to fetch boat details:', error);
  } finally {
    loading.value = false
  }
});

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);

const handlePurchase = async () => {
  try {
    alert('Boat purchase initiated (Sandbox Mode). Proceed to payment gateway for testing.');
  } catch (error) {
    console.error('Error initiating purchase:', error);
  }
};
</script>

<template>
  <v-container v-if="boat">
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <BoatImages :images="boat.images" />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <BoatPurchaseDetails
          :boat="boat"
          :boat-id="boat.id"
          :price="boat.price"
          :format-price="formatPrice"
          :handle-purchase="handlePurchase"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col
        cols="12"
        md="8"
      >
        <BoatSpecifications
          :manufacturer="boat.manufacturer"
          :model="boat.model"
          :price="+boat.price"
          :year="+boat.year"
          :length="+boat.length"
          :boat_type="boat.boat_type"
          :description="boat.description"
          :is-new="!!boat.is_new"
          :format-price="formatPrice"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <BoatLocation
          :city="boat.location?.city"
          :country="boat.location?.country_code"
          :longitude="+boat.location?.longitude"
          :latitude="+boat.location?.latitude"
        />
      </v-col>
    </v-row>

    <v-row
      v-if="boat.engines"
      class="mt-2"
    >
      <v-col
        cols="12"
      >
        <BoatEngineDetails :engines="boat.engines" />
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    />
    <v-alert
      v-else
      type="error"
    >
      Boat not found.
    </v-alert>
  </v-container>
</template>
