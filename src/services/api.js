import axios from "axios";

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
    const token = localStorage.getItem("token");

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
    // Si es 401 (Unauthorized), limpiar el token
    if (error.response?.status === 401) {
      console.error("401 Unauthorized - Token inválido o expirado");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Aquí podrías redirigir a login si lo deseas
    }
    
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

// PATCH request
export const patchRequest = async (endpoint, body, options = {}) => {
  const response = await apiClient.patch(endpoint, body, options);
  return { data: response.data };
};

// DELETE request
export const deleteRequest = async (endpoint, options = {}) => {
  const response = await apiClient.delete(endpoint, options);
  return { data: response.data };
};

export default apiClient;
