<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-tabs
          v-model="filters.boat_type"
          vertical
          @update:model-value="applyFilters"
        >
          <v-tab value="all">
            All
          </v-tab>
          <v-tab value="motor">
            Motor boats
          </v-tab>
          <v-tab value="sailing">
            Sailing boats
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="filters.condition"
          :items="conditions"
          label="Condition"
          item-value="value"
          item-title="text"
        />
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-autocomplete
          v-model="filters.manufacturer_id"
          label="Manufacturer"
          :items="manufacturers"
          :loading="manufacturer_loading"
          item-value="id"
          item-title="name"
        />
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-autocomplete
          v-model="filters.boat_model_id"
          :loading="models_loading"
          label="Model"
          :items="filteredBoatModels"
          :disabled="!filters.manufacturer_id"
          item-value="id"
          item-title="name"
        />
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-range-slider
          v-model="filters.length"
          :max="100"
          :min="0"
          label="Length"
        />
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-range-slider
          v-model="filters.year"
          :max="2025"
          :min="1900"
          label="Year"
        />
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-range-slider
          v-model="filters.price"
          :max="500000"
          :min="0"
          label="Price"
          :step="1000"
        />
      </v-col>

      <v-col
        cols="12"
        class="d-flex justify-end"
      >
        <v-btn
          :loading="loading"
          color="primary"
          @click="applyFilters"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ref, computed, watch, onMounted} from "vue";
import {fetchManufacturers, fetchBoatModels} from "@/api/index.js";

export default {
  props: {
    loading: Boolean,
  },
  emits: ['apply-filters'],
  setup(props, {emit}) {
    const filters = ref({
      category: "all",
      condition: "all",
      manufacturer_id: null,
      boat_model_id: null,
      length: [0, 100],
      year: [1900, 2025],
      price: [10000, 500000],
    });

    const manufacturer_loading = ref(false);
    const models_loading = ref(false);

    const manufacturers = ref([]);
    const boatModels = ref({});
    const conditions = ref([
      {text: "All", value: "all"},
      {text: "New", value: "new"},
      {text: "Used", value: "used"}
    ]);

    const getManufacturers = async () => {
      manufacturer_loading.value = true
      try {
        manufacturers.value = await fetchManufacturers();
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      } finally {
        manufacturer_loading.value = false
      }
    };

    const getBoatModels = async () => {
      models_loading.value = true;
      try {
        if (filters.value.manufacturer_id) {
          boatModels.value[filters.value.manufacturer_id] = await fetchBoatModels(filters.value.manufacturer_id);
        }
      } catch (error) {
        console.error("Error fetching boat models:", error);
      } finally {
        models_loading.value = false;
      }
    };

    const filteredBoatModels = computed(() => {
      return boatModels.value[filters.value.manufacturer_id] || [];
    });

    watch(
      () => filters.value.manufacturer_id,
      () => {
        filters.value.boat_model_id = null;
      }
    );
    watch(
      () => filters.value.manufacturer_id,
      (newManufacturer) => {
        filters.value.boat_model_id = null;
        if (newManufacturer) {
          getBoatModels();
        }
      }
    );
    const applyFilters = () => {
      emit("apply-filters", filters.value);
    };

    onMounted(() => {
      getManufacturers();
    });

    return {
      filters,
      manufacturers,
      filteredBoatModels,
      conditions,
      applyFilters,
      manufacturer_loading,
      models_loading
    };
  },
};
</script>
