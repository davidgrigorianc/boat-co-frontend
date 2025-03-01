import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchBoats = async (filters, page = 1, sort = "price_asc") => {
  try {
    const [sortColumn, sortDirection] = sort.split('_');
    const response = await axios.get(`${API_BASE_URL}/boats`, {
      params: {
        ...filters, page,
        sort: sortColumn,
        direction: sortDirection,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching boats:", error);
    throw error;
  }
};

export const fetchBoatDetailsById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/boats/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boats:", error);
    throw error;
  }
};

export const fetchManufacturers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manufacturers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boats:", error);
    throw error;
  }
};

export const fetchBoatModels = async (manufacturer_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/boat-models`,
      {
        params: {
          manufacturer_id: manufacturer_id,
        }
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching boats:", error);
    throw error;
  }
};

export const doPaymentCheckout = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payment-checkout`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching boats:", error);
    throw error;
  }
};
