<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card
      class="pa-6 text-center success-card"
      elevation="10"
    >
      <v-icon
        color="green"
        size="64"
        class="mb-3"
      >
        mdi-check-circle
      </v-icon>
      <h1 class="text-h4 font-weight-bold">
        Payment Successful!
      </h1>
      <p class="text-body-1 mt-2">
        Thank you for your purchase. <br>
        Your payment has been successfully processed.
      </p>

      <v-divider class="my-4" />

      <v-row justify="center">
        <v-col
          cols="12"
          sm="8"
        >
          <v-card
            outlined
            class="pa-4"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  Boat Name:
                </v-list-item-title>
                <v-list-item-subtitle>{{ boatName }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  Transaction ID:
                </v-list-item-title>
                <v-list-item-subtitle>{{ transactionId }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  Amount Paid:
                </v-list-item-title>
                <v-list-item-subtitle>${{ amount }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        class="mt-4"
        color="primary"
        @click="$router.push('/')"
      >
        Go to Homepage
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const boatName = ref('');
    const transactionId = ref('');
    const amount = ref('');

    onMounted(() => {
      boatName.value = route.query.boat_name || 'N/A';
      transactionId.value = route.query.session_id || 'Unknown';
      amount.value = route.query.amount || '0.00';
    });

    return {boatName, transactionId, amount};
  }
};
</script>

<style scoped>
.success-card {
  max-width: 500px;
  border-radius: 16px;
}
</style>
