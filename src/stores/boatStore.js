import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {fetchBoatDetailsById, fetchBoats} from "@/api";

export const useBoatStore = defineStore("boatStore", () => {
  const boats = ref([]);
  const boatDetails = ref({});
  const loading = ref(false);
  const error = ref(null);

  const loadBoats = async (filters = {}, page = 1, sort = "price_asc") => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchBoats(filters, page, sort);
      boats.value = data.data;
    } catch (err) {
      error.value = err.message || "Failed to load boats";
    } finally {
      loading.value = false;
    }
  };

  const fetchBoatById = async (id) => {
    if (boatDetails.value[id]) return;
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchBoatDetailsById(id);
      boatDetails.value[id] = response
    } catch (err) {
      error.value = err.message || `Failed to load boat ${id}`;
    } finally {
      loading.value = false;
    }
  };

  const getBoatById = computed(() => (id) => boatDetails.value[id] || null);

  return {
    boats,
    boatDetails,
    loading,
    error,
    loadBoats,
    fetchBoatById,
    getBoatById,
  };
});
