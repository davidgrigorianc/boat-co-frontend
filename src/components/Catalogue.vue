<script>
import {ref, onMounted} from "vue";
import BoatCard from "@/components/BoatCard.vue";
import Filters from "@/components/Filters.vue";
import {fetchBoats} from "@/api/index.js";

export default {
  name: 'Catalogue',
  components: {BoatCard, Filters},
  setup() {
    const boatsCount = ref(0);
    const boats = ref([]);
    const filters = ref({});
    const loading = ref(false);
    const isUserSearching = ref(false);
    const page = ref(1);
    const totalPages = ref(1);
    const sort = ref("price_asc");
    const sortOptions = ref([
      {title: "Price: Low to High", value: "price_asc"},
      {title: "Price: High to Low", value: "price_desc"},
      {title: "Year: Newest First", value: "year_desc"},
      {title: "Year: Oldest First", value: "year_asc"},
      {title: "Length: Shortest First", value: "length_asc"},
      {title: "Length: Longest First", value: "length_desc"},
    ]);

    const searchBoats = async (userInitiated = false) => {
      if (userInitiated) isUserSearching.value = true;
      loading.value = true;
      try {
        const response = await fetchBoats(filters.value, page.value, sort.value);
        boats.value = response.data;
        totalPages.value = response.meta.last_page;
        boatsCount.value = response.meta.total;
      } catch (error) {
        console.error("Failed to fetch boats", error);
      } finally {
        loading.value = false;
        isUserSearching.value = false;
      }
    };

    const applyFilters = (updatedFilters) => {
      page.value = 1;
      filters.value = {...updatedFilters};
      searchBoats(true);
    };

    const sortBoats = () => {
      page.value = 1;
      searchBoats();
    };

    onMounted(() => {
      searchBoats();
    });

    return {
      boatsCount,
      boats,
      filters,
      loading,
      isUserSearching,
      page,
      totalPages,
      sort,
      sortOptions,
      searchBoats,
      applyFilters,
      sortBoats,
    };
  },
};
</script>

<template>
  <v-container class="boats-container">
    <v-row>
      <v-col>
        <v-card class="filters-card">
          <Filters
            :loading="isUserSearching"
            @apply-filters="applyFilters"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row class="boats-sort-row">
      <v-col
        class="boats-count my-0"
        cols="auto"
      >
        <span v-if="boatsCount">{{ boatsCount }} boats available</span>
      </v-col>
      <v-col
        class="boats-sort-select my-0"
        cols="auto"
      >
        <v-select
          v-model="sort"
          :items="sortOptions"
          label="Sort By"
          dense
          small-chips
          hide-details
          @update:model-value="sortBoats"
        />
      </v-col>
    </v-row>

    <v-row>
      <template v-if="loading">
        <v-col
          v-for="n in 6"
          :key="n"
          cols="12"
          md="4"
        >
          <v-skeleton-loader type="card" />
        </v-col>
      </template>
      <template v-else>
        <v-col
          v-for="boat in boats"
          :key="boat.id"
          cols="12"
          md="4"
        >
          <BoatCard :boat="boat" />
        </v-col>
      </template>
    </v-row>

    <v-pagination
      v-if="totalPages > 1"
      v-model="page"
      :length="totalPages"
      @update:model-value="searchBoats(true)"
    />
  </v-container>
</template>

<style scoped>
.boats-container {
  min-height: 100vh;
  padding: 2rem;
}

.filters-card {
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.boats-sort-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.boats-count {
  text-align: left;
}

.boats-sort-select {
  text-align: right;
}

.boats-sort-select .v-select {
  max-width: 250px;
}
</style>

