// Configuración base de la API
// En desarrollo, Vite proxy redirige las peticiones automáticamente
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// Función auxiliar para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      response: {
        data: error,
        status: response.status,
      },
    };
  }
  return response.json();
};

// GET request
export const getRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  return { data: await handleResponse(response) };
};

// POST request
export const postRequest = async (endpoint, body, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });
  return { data: await handleResponse(response) };
};

// PUT request
export const putRequest = async (endpoint, body, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });
  return { data: await handleResponse(response) };
};

// DELETE request
export const deleteRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  return { data: await handleResponse(response) };
};
