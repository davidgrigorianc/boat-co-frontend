<template>
  <v-card
    class="d-flex flex-column align-center"
    max-width="400"
  >
    <v-card-title class="text-h6">
      Buy This Boat
    </v-card-title>
    <v-divider />

    <v-card-text class="text-center">
      <v-row>
        <v-col cols="12">
          <v-card-subtitle class="font-weight-bold">
            {{ boat.year }} {{ boat.manufacturer }} - {{ boat.model }}
          </v-card-subtitle>
        </v-col>
      </v-row>


      <v-divider />

      <v-row class="mt-4">
        <v-col cols="12">
          <v-card-subtitle class="text-h6">
            Price: {{ formatPrice(price) }}
          </v-card-subtitle>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-chip
            class="ma-2"
            color="teal"
            text-color="white"
          >
            Secure Payment
          </v-chip>
          <v-chip
            class="ma-2"
            color="light-blue"
            text-color="white"
          >
            Fast Checkout
          </v-chip>
        </v-col>
      </v-row>

      <v-divider />

      <!-- Checkout Button -->
      <v-row class="mt-3">
        <v-col cols="12">
          <v-btn
            color="primary"
            block
            :loading="loading"
            @click="handleCheckout"
          >
            Purchase Boat
          </v-btn>
          <p
            v-if="errorMessage"
            class="error-text"
          >
            {{ errorMessage }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {ref} from 'vue';
import {doPaymentCheckout} from "@/api/index.js";

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  boat_id: {
    type: Number,
    required: true,
  },
  boat: {
    type: Object,
    required: true,
  },
  formatPrice: {
    type: Function,
    required: true,
  },
});

const loading = ref(false);
const errorMessage = ref('');

const handleCheckout = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const data = await doPaymentCheckout({
      amount: props.price,
      boat_id: props.boat_id
    });
    window.location.href = data.url;
  } catch (error) {
    errorMessage.value = error.response?.data?.message ?? 'Failed to initiate checkout. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
#card-element {
  margin-top: 20px;
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
