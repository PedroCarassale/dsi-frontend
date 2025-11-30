import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../../../services/api";

// Obtener todos los trabajos
const getTrabajos = createAsyncThunk(
  "trabajos/getTrabajos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/works");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener los trabajos"
      );
    }
  }
);

// Crear un nuevo trabajo
const createTrabajo = createAsyncThunk(
  "trabajos/createTrabajo",
  async (trabajoData, { rejectWithValue }) => {
    try {
      const response = await postRequest("/works", trabajoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al crear el trabajo"
      );
    }
  }
);

// Actualizar un trabajo existente
const updateTrabajo = createAsyncThunk(
  "trabajos/updateTrabajo",
  async ({ id, ...trabajoData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(`/works/${id}`, trabajoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al actualizar el trabajo"
      );
    }
  }
);

// Eliminar un trabajo
const deleteTrabajo = createAsyncThunk(
  "trabajos/deleteTrabajo",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRequest(`/works/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar el trabajo"
      );
    }
  }
);

export { getTrabajos, createTrabajo, updateTrabajo, deleteTrabajo };

