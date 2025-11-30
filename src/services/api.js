import { store } from "../store/store";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const getAuthToken = () => {
  const state = store.getState();
  return state.auth?.token || null;
};

const getAuthHeaders = (customHeaders = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

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
    headers: getAuthHeaders(options.headers),
    ...options,
  });
  return { data: await handleResponse(response) };
};

export const postRequest = async (endpoint, body, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getAuthHeaders(options.headers),
    body: JSON.stringify(body),
    ...options,
  });
  return { data: await handleResponse(response) };
};

export const putRequest = async (endpoint, body, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: getAuthHeaders(options.headers),
    body: JSON.stringify(body),
    ...options,
  });
  return { data: await handleResponse(response) };
};

export const deleteRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: getAuthHeaders(options.headers),
    ...options,
  });
  return { data: await handleResponse(response) };
};
