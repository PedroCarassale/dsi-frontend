import axios from "axios";
import { store } from "../store/store";

// Configurar URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada request
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Formatear el error para que sea consistente
    const formattedError = {
      response: {
        data: error.response?.data || {},
        status: error.response?.status,
      },
    };
    return Promise.reject(formattedError);
  }
);

// GET request
export const getRequest = async (endpoint, options = {}) => {
  const response = await apiClient.get(endpoint, options);
  return { data: response.data };
};

// POST request
export const postRequest = async (endpoint, body, options = {}) => {
  const response = await apiClient.post(endpoint, body, options);
  return { data: response.data };
};

// PUT request
export const putRequest = async (endpoint, body, options = {}) => {
  const response = await apiClient.put(endpoint, body, options);
  return { data: response.data };
};

// DELETE request
export const deleteRequest = async (endpoint, options = {}) => {
  const response = await apiClient.delete(endpoint, options);
  return { data: response.data };
};

export default apiClient;
